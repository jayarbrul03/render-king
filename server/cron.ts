/**
 * Render King — Scheduled Tasks
 *
 * Blog auto-generation: Tuesday & Thursday at 7am AEST (UTC+10 = 21:00 UTC Mon/Wed)
 * Weekly health audit:  Monday at 8am AEST (UTC+10 = 22:00 UTC Sunday)
 */

import cron from "node-cron";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { desc } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

// ─── Blog Topics Pool ─────────────────────────────────────────────────────────
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
  "current trends in residential construction finishes across Brisbane and SEQ 2025",
  "what the Queensland building boom means for rendering contractors and volume builders",
  "how Render King's warranty system protects builders and homeowners long-term",
  "new acrylic render colour palettes for 2025 — what's trending in SEQ estates",
  "substrate preparation for Hebel and EPS — the step most renderers skip",
];

// ─── Auto-generate a blog draft ───────────────────────────────────────────────
export async function autoGenerateBlogDraft(): Promise<void> {
  console.log("[CRON] Blog auto-generation starting...");

  const db = await getDb();
  if (!db) {
    console.error("[CRON] Database unavailable — skipping blog generation");
    return;
  }

  // Pick a topic not recently used
  const recentPosts = await db
    .select({ title: blogPosts.title })
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .limit(10);
  const recentTitles = recentPosts.map(p => p.title.toLowerCase());

  const availableTopics = BLOG_TOPICS.filter(
    t => !recentTitles.some(rt => rt.includes(t.split(" ")[0].toLowerCase()))
  );
  const pool = availableTopics.length > 0 ? availableTopics : BLOG_TOPICS;
  const chosenTopic = pool[Math.floor(Math.random() * pool.length)];

  const systemPrompt = `You are an expert construction industry content writer for Render King, Queensland's premier rendering and cladding company.
Write SEO-optimised blog articles targeting volume builders and residential builders in South East Queensland (Brisbane, Gold Coast, Ipswich, Morayfield, Springfield, Logan, North Lakes).
Tone: authoritative, professional, direct. No fluff. Positive industry content. Sound like a real trade expert, not an AI.
The company: Render King — QBCC Licence 15565729, ABN 58 650 254 256, 25+ years experience, Dulux Acratex accredited.
Services: Acrylic Render, Hebel AAC Supply & Install, EPS Cladding Systems, Specialty Finishes.
Always output valid JSON only — no markdown fences, no extra text.`;

  const userPrompt = `Write a complete SEO blog article about: "${chosenTopic}"

Return a JSON object with these exact fields:
{
  "title": "Article title (max 70 chars, title case)",
  "slug": "url-friendly-slug-max-60-chars",
  "metaDescription": "SEO meta description 140-160 chars",
  "category": "one of: Industry Insights | Technical Guides | Builder Resources | Company News",
  "readTime": "X min read",
  "content": "Full markdown article body, minimum 700 words. Use ## headings, bullet points where appropriate, and a strong CTA at the end. Include Brisbane/Gold Coast/SEQ references. End with a call to action to contact Render King at projects@renderking.au or call 0468 041 477."
}`;

  try {
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
    if (!raw) throw new Error("LLM returned empty response");

    const parsed = JSON.parse(raw) as {
      title: string;
      slug: string;
      metaDescription: string;
      category: string;
      readTime: string;
      content: string;
    };

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
      published: 0, // Always draft — never auto-publish
    });

    console.log(`[CRON] Blog draft created: "${parsed.title}"`);

    await notifyOwner({
      title: "📝 New Blog Draft Ready for Review",
      content: `A new blog draft has been auto-generated and is waiting for your review before publishing.\n\n**Title:** ${parsed.title}\n**Category:** ${parsed.category}\n**Read time:** ${parsed.readTime}\n\nLog in to renderking.au/admin/blog to review, edit, and publish.`,
    });
  } catch (err) {
    console.error("[CRON] Blog generation failed:", err);
    await notifyOwner({
      title: "⚠️ Blog Auto-Generation Failed",
      content: `The scheduled blog draft generation failed this week. Please generate manually at renderking.au/admin/blog.\n\nError: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
}

// ─── Weekly site health audit ─────────────────────────────────────────────────
export async function runHealthAudit(): Promise<void> {
  console.log("[CRON] Weekly health audit starting...");

  const baseUrl = process.env.VITE_SITE_URL || "https://renderking.au";
  const checks: { name: string; ok: boolean; detail: string }[] = [];

  const checkUrl = async (name: string, path: string): Promise<void> => {
    try {
      const start = Date.now();
      const res = await fetch(`${baseUrl}${path}`, {
        signal: AbortSignal.timeout(10000),
      });
      const ms = Date.now() - start;
      checks.push({
        name,
        ok: res.ok,
        detail: `${res.status} in ${ms}ms`,
      });
    } catch (err) {
      checks.push({
        name,
        ok: false,
        detail: err instanceof Error ? err.message : "Request failed",
      });
    }
  };

  // Check key pages
  await checkUrl("Homepage", "/");
  await checkUrl("Services page", "/services");
  await checkUrl("Contact page", "/contact");
  await checkUrl("Blog page", "/blog");
  await checkUrl("Get a Quote page", "/quote");

  // Check API health
  await checkUrl("tRPC API", "/api/trpc/blog.list?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D");

  // Check DB — count published posts
  let dbStatus = "✅ OK";
  try {
    const db = await getDb();
    if (!db) {
      dbStatus = "⚠️ DB connection unavailable";
    } else {
      const posts = await db.select({ id: blogPosts.id }).from(blogPosts).limit(1);
      dbStatus = `✅ OK (${posts.length >= 0 ? "reachable" : "empty"})`;
    }
  } catch (err) {
    dbStatus = `❌ Error: ${err instanceof Error ? err.message : String(err)}`;
  }

  const failed = checks.filter(c => !c.ok);
  const passed = checks.filter(c => c.ok);

  const statusLines = checks
    .map(c => `${c.ok ? "✅" : "❌"} ${c.name}: ${c.detail}`)
    .join("\n");

  const summary = failed.length === 0
    ? `All ${checks.length} checks passed. Site is healthy.`
    : `${failed.length} check(s) failed out of ${checks.length}.`;

  console.log(`[CRON] Health audit complete — ${summary}`);

  await notifyOwner({
    title: failed.length === 0
      ? "✅ Weekly Site Health Audit — All Clear"
      : `⚠️ Weekly Site Health Audit — ${failed.length} Issue(s) Found`,
    content: `**renderking.au — Weekly Health Report**\n\n${summary}\n\n**Page Checks:**\n${statusLines}\n\n**Database:** ${dbStatus}\n\n${failed.length > 0 ? "Action required — review the failed checks above." : "No action needed."}`,
  });
}

// ─── Register cron schedules ──────────────────────────────────────────────────
export function registerCronJobs(): void {
  // Blog auto-generation: Tuesday & Thursday at 7am AEST (UTC+10 → 21:00 UTC Mon/Wed)
  // Cron: "0 21 * * 1,3" = 9pm UTC Monday and Wednesday = 7am AEST Tuesday and Thursday
  cron.schedule("0 21 * * 1,3", () => {
    autoGenerateBlogDraft().catch(err =>
      console.error("[CRON] Unhandled error in blog generation:", err)
    );
  });

  // Weekly health audit: Monday at 8am AEST (UTC+10 → 22:00 UTC Sunday)
  // Cron: "0 22 * * 0" = 10pm UTC Sunday = 8am AEST Monday
  cron.schedule("0 22 * * 0", () => {
    runHealthAudit().catch(err =>
      console.error("[CRON] Unhandled error in health audit:", err)
    );
  });

  console.log("[CRON] Scheduled jobs registered:");
  console.log("  → Blog auto-generation: Tuesday & Thursday 7am AEST");
  console.log("  → Weekly health audit: Monday 8am AEST");
}
