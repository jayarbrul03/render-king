/**
 * generate-seo-blogs-retry.mjs
 * Retries the 3 failed posts with max_tokens set to avoid truncation.
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const DB_URL = process.env.DATABASE_URL;
const FORGE_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_KEY = process.env.BUILT_IN_FORGE_API_KEY;

const TOPICS = [
  {
    topic: "what is the Dulux Exsulite system and why is it CodeMark certified for Australian residential construction",
    category: "Builder Resources",
  },
  {
    topic: "EPS cladding compliance in Queensland: Class 1 buildings, QDC Part 2.5, and what your renderer must know",
    category: "Builder Resources",
  },
  {
    topic: "lightweight cladding systems for residential construction: EPS, Hebel, and acrylic render compared",
    category: "Technical Guides",
  },
];

const SYSTEM_PROMPT = `You are an expert construction industry content writer for Render King, Queensland's premier rendering and cladding company.
Write SEO-optimised blog articles targeting volume builders in South East Queensland (Brisbane, Gold Coast, Ipswich, Morayfield, Springfield, Logan).
Tone: authoritative, professional, direct. Sound like a real trade expert, not an AI.
The company: Render King — QBCC Licence 15565729, ABN 58 650 254 256, 25+ years experience, Dulux Acratex accredited approved applicator.
Services: Acrylic Render, Hebel AAC Supply & Install, EPS Cladding Systems, Dulux Exsulite lightweight cladding.

SEO LINKING RULES:
- Include 2-3 outbound links to authority sources using markdown: [anchor text](URL)
- Authority URLs to use where relevant:
  * Dulux Acratex: https://www.dulux.com.au/specifier/products/acratex/overview/
  * Dulux Exsulite: https://www.exsulite.com.au/
  * CSR Hebel: https://hebel.com.au/resources/technical-documents/
  * NCC Part F3: https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/f-health-and-amenity/part-f3-roof-and-wall-cladding
  * QDC Part 2.5: https://www.housing.qld.gov.au/__data/assets/pdf_file/0025/15289/QDC-2.5-external-use-of-cladding.pdf
- Link to Render King: [acrylic render](https://renderking.au/services#acrylic-render), [EPS cladding](https://renderking.au/services#eps-cladding)
- Target 700-800 words. Use ## headings. End with CTA: contact projects@renderking.au or call 0468 041 477.
Always output valid JSON only — no markdown fences, no extra text.`;

async function invokeLLM(topic) {
  const userPrompt = `Write a complete SEO blog article about: "${topic}"

Return a JSON object with these exact fields:
{
  "title": "Article title (max 65 chars, title case)",
  "slug": "url-friendly-slug-max-55-chars",
  "metaDescription": "SEO meta description 140-155 chars",
  "readTime": "X min read",
  "content": "Full markdown article, 700-800 words. Use ## headings. Include 2-3 authority outbound links. Include SEQ/Brisbane/Gold Coast references. End with CTA to contact Render King."
}`;

  const res = await fetch(`${FORGE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FORGE_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 3000,
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
