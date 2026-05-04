/**
 * Blog seed script — run once with: node server/seed-blog.mjs
 * Seeds 6 SEO-optimised blog posts targeting volume builders in Brisbane & Gold Coast.
 */
import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const posts = [
  {
    slug: "why-volume-builders-choose-render-king",
    title: "Why Volume Builders Across Brisbane and Gold Coast Choose Render King",
    metaDescription: "Discover why Queensland's leading volume builders trust Render King for acrylic render, Hebel, and EPS cladding across Brisbane, Ipswich, and the Gold Coast.",
    category: "Volume Builders",
    readTime: "5 min read",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-v4-premium-kdDLtzCBsKFqnPhHy8aUQV.webp",
    content: `## The Problem Every Volume Builder Knows

When you're running four to eight starts a week across Greater Brisbane, Ipswich, and the Gold Coast, your render contractor isn't just a subcontractor — they're a critical path item. One missed mobilisation date cascades into a delayed frame inspection, a delayed lockup, and a delayed handover. That's real money.

Most rendering companies are owner-operators running one or two crews. They're good at what they do, but they can't absorb volume. When your programme demands consistent output across multiple sites simultaneously, you need a different kind of operation.

## What Makes a Renderer Right for Volume Work

Volume building is a systems game. The builders who run it well — Ausbuild, Metricon, Stylemaster, GEM Life — don't succeed because they find the cheapest subbies. They succeed because every trade in their programme is predictable. Show up on time. Finish on time. Don't create defects that slow the next trade.

A renderer who's right for volume work has:

- **Multiple trained crews** — not one crew doing everything
- **A dedicated estimating and scheduling function** — so your project brief gets turned around in 24 hours, not a week
- **Documented quality systems** — so the finish on lot 47 is the same as lot 1
- **A single point of contact** — not a different number every time you call

## How Render King Is Structured for Volume

Render King was built specifically for this environment. We run multiple crews across South-East Queensland, operating from Morayfield to Ipswich and down to the Gold Coast. Our estimating team responds to project submissions within one business day. Our scheduling system is built around the builder's programme, not ours.

We apply acrylic render, supply and install Hebel PowerPanelXL, install EPS cladding systems, and deliver specialty finishes — all under one operation. That means one relationship, one invoice, one point of accountability.

## The Cost of Getting This Wrong

A rendering defect — cracking, delamination, poor texture consistency — doesn't just cost the repair. It costs the delay to the next trade, the builder's supervisor time, and the relationship with the client. On a volume programme, one defective renderer can affect dozens of lots before the problem is caught.

Render King carries full public liability insurance, applies Dulux Acratex-accredited systems, and backs every job with a comprehensive warranty. We don't cut corners on product specification because the warranty claim cost is always higher than the material saving.

## Working With Render King

The fastest way to get started is through our Builder Portal. Submit your project details — address, services required, wall area, and start date — and our estimating team will respond within one business day with a price and programme.

For builders running ongoing programmes, we set up standing arrangements that remove the need to requote every lot. If you're running consistent volume across a development, talk to us about a programme agreement.

[Submit a project brief →](/submit-project)`,
    published: 1,
  },
  {
    slug: "acrylic-render-vs-traditional-cement-render-brisbane",
    title: "Acrylic Render vs Traditional Cement Render: What Brisbane Builders Need to Know",
    metaDescription: "Comparing acrylic render and traditional cement render for residential construction in Brisbane and South-East Queensland. Performance, cost, and application differences explained.",
    category: "Technical",
    readTime: "6 min read",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp",
    content: `## Two Systems, Very Different Outcomes

If you're specifying external wall finishes for residential construction in South-East Queensland, the choice between acrylic render and traditional cement render has real implications for programme, cost, and long-term performance. This article covers what you need to know.

## Traditional Cement Render

Traditional cement render — sand and cement mixed on site — has been used in Australian construction for decades. It's a proven system, but it has limitations that matter in a volume building environment.

**Application process:** Cement render typically requires two or three coats applied over multiple days, with curing time between coats. In Queensland's climate, this can be unpredictable — too much heat accelerates drying and increases crack risk; too much moisture slows the process.

**Crack resistance:** Cement render is rigid. As a building moves through its normal settlement cycle, cement render can crack. Hairline cracking is common and, while often cosmetic, creates maintenance obligations and client callbacks.

**Finish consistency:** Achieving a consistent texture across a large facade with cement render depends heavily on the applicator's skill. On a volume programme with multiple crews, texture variation between lots is a real risk.

**Cost:** Material costs for cement render are lower than acrylic systems, but the labour component — multiple coats, longer cure times, higher defect rates — often closes the gap or reverses it.

## Acrylic Render

Acrylic render systems — such as the Dulux Acratex range — use a polymer-modified base coat and a textured acrylic finish coat. They're the dominant system in South-East Queensland volume residential construction for good reason.

**Application process:** Acrylic render systems are typically a two-coat process. The base coat is applied, allowed to cure, and the texture coat follows. The process is faster and more predictable than cement render, which matters on a tight programme.

**Crack resistance:** The polymer content in acrylic render gives it flexibility. It moves with the building rather than cracking. This is a significant advantage in Queensland's climate, where thermal movement is substantial.

**Finish consistency:** Acrylic texture coats are factory-manufactured to a consistent specification. The same product applied by a trained crew produces the same result across every lot. This is critical for volume builders managing client expectations across a development.

**Durability:** Quality acrylic render systems carry manufacturer warranties and are designed to resist UV degradation, moisture ingress, and biological growth. In Queensland's subtropical climate, this matters.

## Which System Is Right for Your Project?

For volume residential construction in South-East Queensland, acrylic render is the standard for good reason. The combination of faster application, better crack resistance, finish consistency, and manufacturer warranty support makes it the lower-risk choice at scale.

Cement render still has applications — heritage work, specific architectural specifications, or projects where the client has a strong preference. But for a volume builder running a programme, the risk profile of cement render is higher than the cost saving justifies.

Render King is a Dulux Acratex-accredited applicator. All our acrylic render work is completed using Acratex-specified systems, which means manufacturer warranty support and a documented quality standard on every job.

[Talk to our estimating team about your next project →](/submit-project)`,
    published: 1,
  },
  {
    slug: "hebel-aac-panels-residential-construction-queensland",
    title: "Hebel AAC Panels for Residential Construction in Queensland: A Builder's Guide",
    metaDescription: "Complete guide to Hebel PowerPanelXL for Queensland residential construction. Fire rating, termite resistance, thermal performance, and installation process explained for volume builders.",
    category: "Technical",
    readTime: "7 min read",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp",
    content: `## What Is Hebel?

Hebel is a brand of autoclaved aerated concrete (AAC) — a lightweight, precast building panel manufactured by CSR. It's been used in Australian construction for over 30 years and has become increasingly common in South-East Queensland residential construction, particularly for external wall cladding systems.

The most common product for residential cladding is the Hebel PowerPanelXL — a 75mm panel designed for direct application to steel or timber framing.

## Why Builders Specify Hebel

Volume builders specify Hebel for a combination of reasons that go beyond the product itself.

**Fire resistance:** Hebel AAC carries a BAL-FZ (Bushfire Attack Level — Flame Zone) rating, making it suitable for the most extreme bushfire exposure categories. In Queensland, where BAL requirements are increasingly common, this is a significant advantage over standard fibre cement cladding systems.

**Termite resistance:** AAC is inorganic — termites cannot eat it. In Queensland's high-termite-risk zones, this is a meaningful advantage and can simplify the termite management specification for the whole building.

**Thermal performance:** Hebel's cellular structure provides genuine thermal mass. In Queensland's climate, this translates to lower cooling loads and better energy efficiency ratings — which matters as NCC energy requirements tighten.

**Weight:** Despite its structural performance, Hebel is significantly lighter than brick veneer. This reduces structural loads and can simplify footing design on some sites.

**Speed of installation:** An experienced Hebel installation crew can cover significant wall area per day. On a volume programme, this speed advantage compounds across a development.

## The Installation Process

Hebel installation is a specialist trade. The panels are large and heavy, requiring appropriate handling equipment. The fixing system — adhesive and mechanical fixings to the framing — must be installed to CSR's specification to maintain the system's structural and fire ratings.

The process follows a defined sequence:

1. **Frame inspection** — the framing must be within tolerance before panels are installed
2. **Panel layout** — panels are set out to minimise cuts and waste
3. **Adhesive application** — CSR-specified adhesive is applied to the framing
4. **Panel installation** — panels are fixed with adhesive and mechanical fixings
5. **Joint treatment** — panel joints are filled and reinforced
6. **Render application** — the system is completed with an approved render system

The render system applied over Hebel must be compatible with the AAC substrate. Render King uses Dulux Acratex systems specified for AAC substrates, ensuring the render and panel system work together as designed.

## Hebel vs EPS Cladding

Both Hebel and EPS (expanded polystyrene) cladding systems are common in South-East Queensland volume residential construction. The right choice depends on the project specification.

| Factor | Hebel AAC | EPS Cladding |
|--------|-----------|--------------|
| Fire rating | BAL-FZ capable | BAL-12.5 to BAL-29 (system dependent) |
| Termite resistance | Full | Full (EPS is inorganic) |
| Thermal mass | High | Low (insulation, not mass) |
| Weight | Moderate | Very light |
| Cost | Higher | Lower |
| Speed | Fast | Very fast |

For projects with BAL-FZ requirements or where thermal mass is a design priority, Hebel is the right choice. For standard residential construction where cost and speed are the primary drivers, EPS cladding systems are a strong option.

## Working With Render King on Hebel Projects

Render King supplies and installs Hebel PowerPanelXL for residential and low-rise construction across South-East Queensland. Our crews are trained in CSR's installation specification and we manage the full process from supply through to render completion.

[Submit your Hebel project for pricing →](/submit-project)`,
    published: 1,
  },
  {
    slug: "how-to-get-fast-render-quotes-brisbane-gold-coast",
    title: "How to Get Fast, Accurate Render Quotes in Brisbane and Gold Coast",
    metaDescription: "What information your renderer needs to turn around an accurate quote in 24 hours. A practical guide for volume builders and project managers in South-East Queensland.",
    category: "For Builders",
    readTime: "4 min read",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-sunset-cove-Zkx6WQV6sk5aHsnhX6jeYM.webp",
    content: `## Why Render Quotes Take So Long

The most common complaint from builders about their render contractor isn't price — it's turnaround time. A quote that takes a week to arrive is a quote that holds up your programme. By the time it lands, your start date may have already moved.

The reason most render quotes are slow is simple: the estimator doesn't have enough information to price the job accurately, so they either delay while they chase it, or they pad the price to cover the unknowns.

The solution is equally simple: give your renderer the right information upfront.

## What Your Renderer Needs to Quote Accurately

An accurate render quote requires five things:

**1. Plans or elevations**
The elevations are the most important document. They show the wall area, the height, the substrate, and the architectural features that affect the price — reveals, returns, arches, feature panels. Without elevations, your renderer is guessing.

**2. Substrate specification**
Is it brick, block, Hebel, EPS, Blueboard, or a combination? The substrate affects the product specification, the preparation required, and the price. If the substrate changes between the quote and the job, the price will change too.

**3. Finish specification**
What texture and colour system is specified? If the architect has specified a particular Dulux Acratex system, your renderer needs to know. If the finish is builder's choice, say so — your renderer can recommend a system that balances cost, performance, and appearance.

**4. Site address and access**
Render pricing varies by location. A job in Morayfield prices differently to a job in the Gold Coast hinterland. Access matters too — scaffolding requirements, site conditions, and parking all affect the price.

**5. Indicative start date**
Your renderer needs to know when the job is likely to start to schedule their crews. An indicative start date — even a month — is enough. If you can't give a date, say so; a good renderer will work with you.

## The Render King Builder Portal

Render King's Builder Portal is designed to collect exactly this information in a structured format. Builders submit their project brief — company details, project address, services required, wall area, start date, and any relevant files — and our estimating team responds within one business day.

The portal accepts file uploads, so you can attach your elevations, plans, and specifications directly. This removes the back-and-forth that slows most quoting processes down.

For builders running ongoing programmes, we set up standing arrangements that remove the need to requote every lot. If you're running consistent volume across a development, a programme agreement gives you price certainty and scheduling priority.

## What Happens After You Submit

Once your project brief is received, our estimating team reviews the information and prepares a price. If anything is missing, we'll contact you — but if you've provided the five items above, we can usually price without further queries.

You'll receive a written quote covering the scope, product specification, price, and programme. If you want to proceed, we'll schedule the job and confirm the start date.

[Submit your project brief →](/submit-project)`,
    published: 1,
  },
  {
    slug: "render-defects-how-to-avoid-them-volume-builders",
    title: "Render Defects: How Volume Builders Can Avoid the Most Expensive Callbacks",
    metaDescription: "The most common render defects in Queensland residential construction, their causes, and how a quality renderer prevents them. A practical guide for volume builders and project managers.",
    category: "Quality",
    readTime: "6 min read",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp",
    content: `## The Real Cost of a Render Defect

A render defect on a completed house isn't just a repair cost. It's the supervisor's time to inspect and document it. It's the delay to the client's settlement. It's the conversation with the client who's already frustrated. And if the defect is systemic — affecting multiple lots across a development — it's a programme-level problem.

The most expensive render defects aren't the ones that appear immediately. They're the ones that appear two years after handover, when the builder is still within their statutory warranty period and the renderer has moved on.

Understanding the common causes of render defects — and how a quality renderer prevents them — is worth the time.

## The Most Common Render Defects in Queensland

**Cracking**
Cracking is the most common render complaint. It ranges from hairline surface cracking (usually cosmetic) to structural cracking that allows moisture ingress. The causes include:

- Incorrect product specification for the substrate
- Insufficient curing time between coats
- Application in extreme heat without appropriate protection
- Inadequate control joints at movement points
- Substrate movement before render has cured

A quality renderer specifies the right product for the substrate, applies in appropriate conditions, and installs control joints at the locations specified by the system manufacturer.

**Delamination**
Delamination — where the render separates from the substrate — is a serious defect. It's almost always caused by inadequate substrate preparation: dust, contamination, or a substrate that wasn't primed correctly.

On Hebel and EPS substrates, the primer specification is critical. The wrong primer, or no primer, will result in delamination. Render King uses Dulux Acratex-specified primers for every substrate type, applied to the manufacturer's specification.

**Texture inconsistency**
On a volume programme, texture inconsistency between lots is a common complaint. It's caused by variation in product mixing, application technique, or tool selection between crews or between visits.

Render King uses factory-manufactured texture coats applied by trained crews using consistent technique. Our quality system includes site inspections to verify texture consistency before the job is signed off.

**Colour variation**
Colour variation — particularly on large facades — can be caused by variation in batch numbers, application thickness, or substrate moisture content. On a volume programme, this is managed by ordering sufficient product from a single batch for each development, and by applying to a consistent dry film thickness.

**Moisture ingress at penetrations**
Windows, doors, and service penetrations are the most common entry points for moisture behind render. Correct flashing and sealant installation at these points is the renderer's responsibility. A quality renderer treats penetrations as a critical detail, not an afterthought.

## How Render King Manages Quality

Render King's quality system is built around three principles: right product, right process, right people.

**Right product:** We specify Dulux Acratex systems for every job, matched to the substrate and the finish specification. We don't substitute products to save cost.

**Right process:** Our crews follow documented application procedures. Control joints are installed at specified locations. Curing times are observed. Penetrations are treated to specification.

**Right people:** Our crews are trained in the systems they apply. New crew members work alongside experienced applicators before working independently.

The result is a defect rate that's significantly lower than the industry average — and a warranty that means something when a defect does occur.

[Talk to our team about your next project →](/submit-project)`,
    published: 1,
  },
  {
    slug: "render-king-communication-systems-for-builders",
    title: "Why Communication Is the Most Underrated Part of a Render Contract",
    metaDescription: "How Render King's communication systems give volume builders in Brisbane and Gold Coast real-time visibility over their render programme — and why it matters for your bottom line.",
    category: "Systems",
    readTime: "5 min read",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-v4-premium-kdDLtzCBsKFqnPhHy8aUQV.webp",
    content: `## The Communication Problem in Subcontracting

Ask any volume builder's site supervisor what frustrates them most about their subcontractors, and communication comes up every time. Not price. Not quality. Communication.

The specific complaints are consistent: not knowing when the trade is coming, not getting a call when they can't make it, finding out about a problem after it's already caused a delay. These aren't technical failures — they're communication failures. And in a volume building programme, they're expensive.

## Why Communication Matters More Than You Think

A rendering crew that doesn't show up on a Monday morning doesn't just cost one day. It costs the frame inspection that was scheduled for Tuesday. It costs the lockup that was scheduled for Wednesday. It costs the supervisor's time rescheduling the next three trades. And it costs the relationship with the client who was told their house would be locked up this week.

In a volume programme running four to eight starts per week, one communication failure can cascade across multiple lots. The cost isn't the missed day — it's the ripple effect through the programme.

## What Good Communication Looks Like

Good communication from a renderer isn't complicated. It's three things:

**1. Confirmed start dates**
When a job is scheduled, the builder gets a written confirmation with the start date, the crew, and the expected completion. Not a verbal commitment — a written one.

**2. Proactive notification of changes**
If the start date changes — for any reason — the builder is notified immediately, not the morning of. This gives the builder time to adjust the programme rather than react to a surprise.

**3. A single point of contact**
The builder has one number to call. Not a different number depending on who's on site, not a number that goes to voicemail. One contact who knows the job and can answer questions.

## How Render King Is Set Up for Communication

Render King's operations are structured around the builder's programme, not ours. Our scheduling team maintains visibility over all active jobs and communicates changes proactively.

Every job has a confirmed start date in writing. If that date changes, the builder is notified before the scheduled start — not after. Our project contact is available during business hours and responds to messages the same day.

For builders running ongoing programmes, we set up a direct communication channel — typically a dedicated WhatsApp or email thread — so there's no ambiguity about who to contact or where to find information about a job.

## The Bigger Picture

Communication is a proxy for how a business is run. A renderer who communicates well has a scheduling system, a crew management system, and a culture of accountability. A renderer who doesn't communicate well is usually running on instinct — and instinct doesn't scale.

Render King was built to operate at volume. That means systems, not instinct. It means the builder knows what's happening on their job without having to chase it.

[Submit a project brief and see how we work →](/submit-project)`,
    published: 1,
  },
];

async function seed() {
  const conn = await createConnection(process.env.DATABASE_URL);
  console.log("Connected to database");

  for (const post of posts) {
    try {
      await conn.execute(
        `INSERT INTO blog_posts (slug, title, metaDescription, category, readTime, heroImage, content, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           metaDescription = VALUES(metaDescription),
           category = VALUES(category),
           readTime = VALUES(readTime),
           heroImage = VALUES(heroImage),
           content = VALUES(content),
           published = VALUES(published)`,
        [post.slug, post.title, post.metaDescription, post.category, post.readTime, post.heroImage, post.content, post.published]
      );
      console.log(`✓ Seeded: ${post.slug}`);
    } catch (err) {
      console.error(`✗ Failed: ${post.slug}`, err.message);
    }
  }

  await conn.end();
  console.log("Done.");
}

seed().catch(console.error);
