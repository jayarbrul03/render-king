import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sendContactEmail, sendProjectEmail, sendBlogBlast } from "./email";
import { z } from "zod";
import { getDb } from "./db";
import { blogPosts, clientEmails } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "./_core/llm";

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

// ─── Project Submission Schema ───────────────────────────────────────────────
const projectSubmissionSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  builderType: z.string().optional(),
  projectAddress: z.string().min(1, "Project address is required"),
  suburb: z.string().min(1, "Suburb is required"),
  projectType: z.string().optional(),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
  wallArea: z.string().optional(),
  startDate: z.string().optional(),
  notes: z.string().optional(),
  fileNames: z.array(z.string()).optional(),
});

// ─── Contact Form Schema ─────────────────────────────────────────────────────
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

// ─── Blog topics pool ─────────────────────────────────────────────────────────
const BLOG_TOPICS = [
  "volume builder partnerships and rendering timelines in South East Queensland",
  "acrylic render vs cement render for Queensland homes — what volume builders need to know",
  "Hebel AAC panels: why they're the fastest cladding system for residential builds",
  "how Render King delivers fast turnaround on large residential estates in Brisbane",
  "EPS cladding systems for residential construction — cost, speed, and performance",
  "why defect-free rendering starts before the first coat — substrate prep on Gold Coast builds",
  "AI and automation in the rendering trade — how Render King is building smarter",
  "10-year warranties on acrylic render: what volume builders should demand from their renderer",
  "rendering for Metricon, Ausbuild, and volume builders — what sets Render King apart",
  "Dulux Acratex accreditation: why it matters for residential rendering in Queensland",
  "render scheduling on large estates — how to avoid delays and defects",
  "external wall systems for new residential builds: a complete guide for builders",
  "why Hebel is replacing brick veneer on Gold Coast new builds",
  "render and paint packages — how bundled services save builders time and money",
  "communication systems in the rendering trade — how Render King keeps builders informed",
];

export const appRouter = router({
  system: systemRouter,

  // ─── Blog (public) ────────────────────────────────────────────────────────
  blog: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        metaDescription: blogPosts.metaDescription,
        category: blogPosts.category,
        readTime: blogPosts.readTime,
        heroImage: blogPosts.heroImage,
        createdAt: blogPosts.createdAt,
      }).from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.createdAt));
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const rows = await db.select().from(blogPosts)
          .where(eq(blogPosts.slug, input.slug))
          .limit(1);
        return rows[0] ?? null;
      }),
  }),

  // ─── Blog Admin ───────────────────────────────────────────────────────────
  blogAdmin: router({
    // List all posts (including unpublished)
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    }),

    // Toggle published status
    togglePublished: adminProcedure
      .input(z.object({ id: z.number(), published: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(blogPosts).set({ published: input.published }).where(eq(blogPosts.id, input.id));
        return { success: true };
      }),

    // Delete a post
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
        return { success: true };
      }),

    // Send a blog post as email blast to all active clients
    sendBlast: adminProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const posts = await db.select().from(blogPosts).where(eq(blogPosts.id, input.postId)).limit(1);
        if (!posts[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
        const post = posts[0];
        const clients = await db.select().from(clientEmails).where(eq(clientEmails.active, 1));
        if (clients.length === 0) throw new TRPCError({ code: "BAD_REQUEST", message: "No active clients in the list" });
        const result = await sendBlogBlast(post, clients);
        return { success: true, sent: result.sent, failed: result.failed };
      }),

    // AI-generate a new blog post
    generate: adminProcedure
      .input(z.object({
        topic: z.string().optional(),
        saveDraft: z.boolean().optional().default(false),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const chosenTopic = input.topic || BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];

        const systemPrompt = `You are an expert construction industry content writer for Render King, Queensland's premier rendering and cladding company.
Write SEO-optimised blog articles targeting volume builders and residential builders in South East Queensland (Brisbane, Gold Coast, Ipswich, Morayfield, Springfield, Logan, North Lakes).
Tone: authoritative, professional, direct. No fluff. Positive industry content.
The company: Render King — QBCC Licence 15565729, ABN 58 650 254 256, 25 years experience, 10,000+ projects, Dulux Acratex accredited.
Services: Acrylic Render, Hebel AAC Supply & Install, EPS Cladding Systems, Specialty Finishes.
Always output valid JSON only — no markdown fences, no extra text.`;

        const userPrompt = `Write a complete SEO blog article about: "${chosenTopic}"

Return a JSON object with these exact fields:
{
  "title": "Article title (max 70 chars, uppercase style)",
  "slug": "url-friendly-slug-max-60-chars",
  "metaDescription": "SEO meta description 140-160 chars",
  "category": "one of: Industry Insights | Technical Guides | Builder Resources | Company News",
  "readTime": "X min read",
  "content": "Full markdown article body, minimum 600 words. Use ## headings, bullet points, and strong CTAs. Include Brisbane/Gold Coast/SEQ references. End with a call to action to contact Render King at projects@renderking.au or 0468 041 477."
}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "blog_post",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  metaDescription: { type: "string" },
                  category: { type: "string" },
                  readTime: { type: "string" },
                  content: { type: "string" },
                },
                required: ["title", "slug", "metaDescription", "category", "readTime", "content"],
                additionalProperties: false,
              },
            },
          },
        });

        const raw = response?.choices?.[0]?.message?.content as string | null | undefined;
        if (!raw) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "LLM returned empty response" });

        let parsed: { title: string; slug: string; metaDescription: string; category: string; readTime: string; content: string };
        try {
          parsed = JSON.parse(raw);
        } catch {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "LLM response was not valid JSON" });
        }

        // Ensure unique slug
        const baseSlug = parsed.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 60);
        const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

        await db.insert(blogPosts).values({
          slug: uniqueSlug,
          title: parsed.title,
          metaDescription: parsed.metaDescription,
          category: parsed.category,
          readTime: parsed.readTime,
          heroImage: null,
          content: parsed.content,
          published: input.saveDraft ? 0 : 1,
        });

        return { success: true, slug: uniqueSlug, title: parsed.title, published: input.saveDraft ? 0 : 1 };
      }),
  }),

  // ─── Client Email List (admin) ────────────────────────────────────────────
  clients: router({
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(clientEmails).orderBy(desc(clientEmails.createdAt));
    }),
    add: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(clientEmails).values({
          name: input.name,
          email: input.email,
          company: input.company || null,
          active: 1,
        });
        return { success: true };
      }),
    toggleActive: adminProcedure
      .input(z.object({ id: z.number(), active: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(clientEmails).set({ active: input.active }).where(eq(clientEmails.id, input.id));
        return { success: true };
      }),
    remove: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(clientEmails).where(eq(clientEmails.id, input.id));
        return { success: true };
      }),
  }),

  // ─── Contact Form ─────────────────────────────────────────────────────────
  contact: router({
    send: publicProcedure
      .input(contactFormSchema)
      .mutation(async ({ input }) => {
        try {
          await sendContactEmail(input);
          await notifyOwner({
            title: `📩 Website Enquiry — ${input.company || input.name}`,
            content: `From: ${input.name}${input.company ? ` (${input.company})` : ""}\nPhone: ${input.phone}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
          }).catch(() => {});
          return { success: true };
        } catch (error) {
          console.error("[Contact Form] Email error:", error);
          throw new Error("Failed to send enquiry. Please try again or email us directly at projects@renderking.au");
        }
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Builder Portal — Project Submission ─────────────────────────────────
  project: router({
    submit: publicProcedure
      .input(projectSubmissionSchema)
      .mutation(async ({ input }) => {
        const reference = `RK-${Date.now().toString().slice(-8)}`;
        try {
          await sendProjectEmail({ ...input, reference });
        } catch (emailError) {
          console.error("[Project Submission] Email error:", emailError);
        }
        const fileList = input.fileNames && input.fileNames.length > 0
          ? input.fileNames.map((f) => `  • ${f}`).join("\n")
          : "  No files attached — team to follow up";
        const notificationContent = `
NEW PROJECT SUBMISSION — RENDER KING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILDER / CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company:       ${input.companyName}
Contact:       ${input.contactName}
Phone:         ${input.phone}
Email:         ${input.email}
Builder Type:  ${input.builderType || "Not specified"}

PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Address:       ${input.projectAddress}
Suburb:        ${input.suburb}
Project Type:  ${input.projectType || "Not specified"}
Services:      ${input.services.join(", ")}
Wall Area:     ${input.wallArea ? `${input.wallArea} m²` : "Not specified"}
Start Date:    ${input.startDate || "Not specified"}

NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${input.notes || "No additional notes."}

ATTACHED FILES (${input.fileNames?.length || 0})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${fileList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reference: ${reference}
        `.trim();
        try {
          await notifyOwner({
            title: `🏗️ New Project: ${input.companyName} — ${input.suburb}`,
            content: notificationContent,
          });
        } catch {
          // non-blocking
        }
        return {
          success: true,
          reference,
          message: "Project submitted successfully. Our estimating team has been notified and will respond within 1 business day.",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
