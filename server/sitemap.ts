import { eq } from "drizzle-orm";
import { blogPosts } from "../drizzle/schema";
import { getDb } from "./db";

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://renderking.au"
).replace(/\/$/, "");

type SitemapEntry = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
  lastmod?: Date;
};

const STATIC_PAGES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.9 },
  { path: "/services/acrylic-render", changefreq: "monthly", priority: 0.9 },
  { path: "/services/specialty-finishes", changefreq: "monthly", priority: 0.9 },
  { path: "/services/hebel-installation", changefreq: "monthly", priority: 0.9 },
  { path: "/services/eps-cladding", changefreq: "monthly", priority: 0.9 },
  { path: "/portfolio", changefreq: "monthly", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/safety", changefreq: "monthly", priority: 0.6 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
  { path: "/submit-project", changefreq: "monthly", priority: 0.8 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatLastmod(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function renderUrl(entry: SitemapEntry): string {
  const loc = escapeXml(`${SITE_URL}${entry.path}`);
  const lastmod = entry.lastmod
    ? `\n    <lastmod>${formatLastmod(entry.lastmod)}</lastmod>`
    : "";

  return `  <url>
    <loc>${loc}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
}

export async function buildSitemapXml(): Promise<string> {
  const entries: SitemapEntry[] = [...STATIC_PAGES];

  const db = await getDb();
  if (db) {
    const posts = await db
      .select({
        slug: blogPosts.slug,
        updatedAt: blogPosts.updatedAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, 1));

    for (const post of posts) {
      entries.push({
        path: `/blog/${post.slug}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: post.updatedAt,
      });
    }
  }

  const body = entries.map(renderUrl).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
