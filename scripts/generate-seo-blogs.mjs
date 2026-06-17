/**
 * generate-seo-blogs.mjs
 * Generates 8 high-quality SEO blog posts and inserts them into the database.
 * Run: node scripts/generate-seo-blogs.mjs
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

const FORGE_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_KEY = process.env.BUILT_IN_FORGE_API_KEY;
if (!FORGE_URL || !FORGE_KEY) throw new Error("LLM env vars not set");

const TOPICS = [
  {
    topic: "Dulux Acratex AcraShield 955: the high-build elastomeric system Queensland volume builders are specifying",
    category: "Technical Guides",
  },
  {
    topic: "Dulux Exsulite EPS cladding system: the complete guide for Queensland residential builders",
    category: "Technical Guides",
  },
  {
    topic: "what is the Dulux Exsulite system and why is it CodeMark certified for Australian residential construction",
    category: "Builder Resources",
  },
  {
    topic: "NCC 2022 external wall cladding requirements: what Queensland residential builders need to know",
    category: "Builder Resources",
  },
  {
    topic: "Dulux Acratex approved applicator program: what it takes and why Render King holds accreditation",
    category: "Industry Insights",
  },
  {
    topic: "EPS cladding compliance in Queensland: Class 1 buildings, QDC Part 2.5, and what your renderer must know",
    category: "Builder Resources",
  },
  {
    topic: "Dulux Acratex texture systems: micron thickness, flexibility ratings, and why they outperform standard render",
    category: "Technical Guides",
  },
  {
    topic: "lightweight cladding systems for residential construction: EPS, Hebel, and acrylic render compared",
    category: "Technical Guides",
  },
];

const SYSTEM_PROMPT = `You are an expert construction industry content writer for Render King, Queensland's premier rendering and cladding company.
Write SEO-optimised blog articles targeting volume builders and residential builders in South East Queensland (Brisbane, Gold Coast, Ipswich, Morayfield, Springfield, Logan, North Lakes).
Tone: authoritative, professional, direct. No fluff. Sound like a real trade expert, not an AI.
The company: Render King — QBCC Licence 15565729, ABN 58 650 254 256, 25+ years experience, Dulux Acratex accredited approved applicator.
Services: Acrylic Render, Hebel AAC Supply & Install, EPS Cladding Systems, Dulux Exsulite lightweight cladding, Specialty Finishes.

SEO LINKING RULES (critical):
- Include outbound links to authoritative sources using markdown hyperlink syntax: [anchor text](URL)
- Use these real authority URLs where naturally relevant:
  * Dulux Acratex products: https://www.dulux.com.au/specifier/products/acratex/overview/
  * Dulux Exsulite system: https://www.exsulite.com.au/
  * CSR Hebel technical docs: https://hebel.com.au/resources/technical-documents/
  * NCC Part F3 wall cladding: https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/f-health-and-amenity/part-f3-roof-and-wall-cladding
  * QDC Part 2.5 external cladding (Queensland government): https://www.housing.qld.gov.au/__data/assets/pdf_file/0025/15289/QDC-2.5-external-use-of-cladding.pdf
  * Dulux Acratex EPS substrate guide: https://assets.ctfassets.net/j001bqnk84dk/2r9wOCBXEhtanqGIxZy5ZY/45b75629e3643bade2e7e2db96d0ee70/Substrate_Guide_-_EPS.pdf
- Include 2-4 outbound authority links per article
- Link back to Render King service pages: [acrylic render](https://renderking.au/services#acrylic-render), [Hebel installation](https://renderking.au/services#hebel), [EPS cladding](https://renderking.au/services#eps-cladding)
- Minimum 900 words. Use specific technical terms, product names, and compliance references.
Always output valid JSON only — no markdown fences, no extra text.`;

async function invokeLLM(topic) {
  const userPrompt = `Write a complete SEO blog article about: "${topic}"

Return a JSON object with these exact fields:
{
  "title": "Article title (max 70 chars, title case)",
  "slug": "url-friendly-slug-max-60-chars",
  "metaDescription": "SEO meta description 140-160 chars",
  "readTime": "X min read",
  "content": "Full markdown article body, minimum 900 words. Use ## headings, bullet points where appropriate. Include Brisbane/Gold Coast/SEQ references. Include 2-4 outbound authority links. End with a strong CTA to contact Render King at projects@renderking.au or call 0468 041 477."
}`;

  const res = await fetch(`${FORGE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FORGE_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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
              readTime: { type: "string" },
              content: { type: "string" },
            },
            required: ["title", "slug", "metaDescription", "readTime", "content"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty LLM response");
  return JSON.parse(raw);
}

async function main() {
  const conn = await mysql.createConnection(DB_URL);
  console.log("Connected to database.");

  let successCount = 0;

  for (let i = 0; i < TOPICS.length; i++) {
    const { topic, category } = TOPICS[i];
    console.log(`\n[${i + 1}/${TOPICS.length}] Generating: "${topic.slice(0, 60)}..."`);

    try {
      const post = await invokeLLM(topic);

      const baseSlug = post.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 55);
      const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
      const now = Date.now();

      await conn.execute(
        `INSERT INTO blog_posts (slug, title, metaDescription, category, readTime, heroImage, content, published)
         VALUES (?, ?, ?, ?, ?, NULL, ?, 1)`,
        [
          uniqueSlug,
          post.title,
          post.metaDescription,
          category,
          post.readTime,
          post.content,
        ]
      );

      console.log(`  ✓ Published: "${post.title}"`);
      successCount++;

      // Small delay to avoid rate limiting
      if (i < TOPICS.length - 1) {
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  await conn.end();
  console.log(`\nDone. ${successCount}/${TOPICS.length} posts published.`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
