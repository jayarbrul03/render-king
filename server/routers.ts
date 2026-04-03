import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sendContactEmail, sendProjectEmail } from "./email";
import { z } from "zod";

// ─── Project Submission Schema ───────────────────────────────────────────────
const projectSubmissionSchema = z.object({
  // Step 1 — Builder Details
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  builderType: z.string().optional(),
  // Step 2 — Project Details
  projectAddress: z.string().min(1, "Project address is required"),
  suburb: z.string().min(1, "Suburb is required"),
  projectType: z.string().optional(),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
  wallArea: z.string().optional(),
  startDate: z.string().optional(),
  notes: z.string().optional(),
  // Step 3 — File names (actual files are handled client-side)
  fileNames: z.array(z.string()).optional(),
});

// ─── Contact Form Schema ─────────────────────────────────────────────────────
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const appRouter = router({
  system: systemRouter,

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

        // Send email via Resend
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
