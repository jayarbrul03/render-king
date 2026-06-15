# Render King Website — TODO

## Core Pages
- [x] Homepage — hero, stats bar, services grid, Sunset Cove case study, clients, testimonials, MCK cross-ref, CTA
- [x] Services overview page
- [x] Acrylic Render service page
- [x] Hebel Supply & Install service page
- [x] EPS Cladding Systems service page
- [x] Specialty Finishes & External Microcement service page
- [x] Portfolio page with category filter and Sunset Cove feature
- [x] About page — Matty's story, 24 years, 10,000+ projects, Render Render Pty Ltd group
- [x] Safety & Compliance page — PSRA, SWMS, staff training, customer communication
- [x] Contact page

## Builder Portal
- [x] 4-step form: Your Details → Project Info → Upload Files → Review & Submit
- [x] File drag-and-drop upload (client-side file selection)
- [x] Server-side submission via tRPC
- [x] Instant owner notification on submission (notifyOwner)
- [x] Submission reference number generated
- [x] Success confirmation page

## Design & Brand
- [x] Dark Luxury Editorial design system (charcoal/black + gold + white)
- [x] Montserrat font (black weight for headings, light for body)
- [x] Global CSS tokens: rk-gold, rk-section-label, rk-btn-gold, rk-btn-outline, rk-card, rk-divider
- [x] Navigation — sticky, gold SUBMIT PROJECT CTA, Services dropdown
- [x] Footer — full column layout, MCK cross-reference, contact details
- [x] Mobile-first responsive layout

## SEO & Meta
- [x] Title tags and meta descriptions on all pages
- [x] Canonical URLs
- [x] robots.txt
- [x] Structured data (JSON-LD) — LocalBusiness schema
- [x] Open Graph tags

## Authority Claims (Verified)
- [x] 10,000+ projects (combined Render King history)
- [x] 100,000+ combined hours
- [x] 24 years experience
- [x] $1.2M+ single project (Sunset Cove)
- [x] Sunset Cove — record-breaking, Channel 9, sold at auction

## Testing
- [x] auth.logout vitest — passing
- [x] project.submit vitest — 3 tests passing

## v2 Rebuild — Corrections from Matty
- [x] Research accurate Queensland volume residential render photography
- [x] Generate new hero images: render crews on site, volume estates, freshly finished facades
- [x] Remove Sunset Cove from Render King (MCK story only)
- [x] Rewrite homepage messaging — Render first, volume builder pain points (speed, consistency, communication, crew size)
- [x] Reorder services: Acrylic Render dominant, Hebel/EPS as add-on/support services
- [x] Fix Hebel imagery — external wall panels not interior framing
- [x] Replace luxury-only imagery with mix of volume residential + quality finishes
- [x] Rewrite stats/authority section around crew size, volume, estate delivery capability
- [x] Rebuild About section around operational scale, systems, crew management
- [x] Update all service page copy to reflect correct positioning

## Future Enhancements
- [ ] File upload to S3 from Builder Portal (currently file names only)
- [ ] Admin dashboard to view all project submissions
- [ ] Google Analytics 4 integration
- [ ] Google My Business schema markup
- [ ] Blog / News section for SEO content
- [ ] Micro Cement King website build (next project)

## v3 Visual Editor Feedback — Matty's Corrections
- [ ] Hero: fix heading formatting — no orphan word, full-width impact
- [ ] Hero: new concept — process flow (AAC Hebel → basecoat → finish render → luxury completed home) OR new aspirational hero image
- [ ] Hero: replace hero photo — statement home, place people want to live
- [ ] Problem section: remove competitor-bagging language, reframe around how we deliver above expectations
- [ ] Problem section heading: rewrite — make it clear and direct
- [ ] Services grid: reorder — Acrylic Render + Texture Coatings top, Specialty Finishes next, Hebel + EPS as add-ons bottom
- [ ] Services grid: separate EPS Cladding and Specialty Finishes into their own cards
- [ ] Services grid: add external Microcement as a service card
- [ ] Services grid: add supplier/authority logos (Dulux Acratex, CSR Hebel, Rockcote, Ensulite)
- [ ] Portfolio images: better colour selection, proper landscaping, aspirational homes
- [ ] Portfolio: add single-storey homes row
- [ ] Portfolio: Hebel image must show completed finished home with windows in, not frames
- [ ] MCK section: remove "polished" language, make it a statement
- [ ] Navigation: add crown/logo mark or visual identity — not plain text only
- [ ] Footer: reorder services — Microcement, Render, Specialty Finishes, then Hebel, EPS
- [ ] Footer: remove "sister brand" language for MCK
- [ ] Footer: update phone number (find from Render Render website)
- [ ] Footer: change email label to "Projects at Render King"

## v4 Feedback — Matty
- [ ] Remove crown from logo — clean wordmark only, no icon
- [ ] New hero image — premium exterior with specialty finish/microcement element, something special
- [ ] Hero headline — rewritten for builders: speed, quality, delivery
- [ ] CTAs changed to Submit a Project + Call Us Now (remove View Our Work from hero)
- [ ] Process flow section — replace crew photo with fading sequence: AAC substrate → basecoat → finish render → completed luxury home
- [ ] No Render Render branding visible in process photos
- [ ] Lock in RENDER DONE RIGHT. EVERY TIME. as brand slogan

## v5 Visual Editor Feedback — Matty
- [ ] Generate: Hebel full AAC sheets on house exterior (no frames visible)
- [ ] Generate: Specialty finish — microcement cloudy texture, luxury landscaping
- [ ] Generate: MCK-style luxury interior — concrete coloured microcement, kitchen to outdoors, industrial
- [ ] Services: Render photos first (4 render photos), Hebel/EPS moved down as add-ons
- [ ] Hebel copy: "We work with selected builders on the whole system — focused delivery"
- [ ] Add AI integration messaging: leading with AI, safety, job reporting, customer communication
- [ ] Portfolio: more render variety and colour choices
- [ ] MCK cross-ref section: add luxury microcement interior photo
- [ ] Footer: add HYCHEM and IDEAL WORKS to supplier logos

## v6 Builder Portal UX Fix — Matty
- [x] Measurements section: white/light background, dark high-contrast inputs, clear labels, no text cut-off
- [x] Apply conversion-first hard rule: every section scannable in 3 seconds, next action always obvious
- [x] Form step progress must be visually dominant — builder knows exactly where they are
- [x] Input fields: large, clearly labelled, high contrast, nothing getting cut off on mobile
- [x] Section headings: strong hierarchy, not competing with dark background
- [x] CTA button at bottom of each step must be unmissable — gold, full width on mobile
- [x] Hard rule locked in: if any section doesn't enhance connection or retention, it gets reworked

## Automation & Scheduled Tasks
- [x] Automated blog draft generation — Tue/Thu 7am AEST, saves as draft, notifies owner
- [x] Weekly site health audit — Monday 8am AEST, checks all pages + DB, notifies owner
- [x] Fix admin auth gate — proper login/not-admin screens instead of silent redirect
- [x] Admin dashboard — blog draft queue with drafts-first sorting and orange badge
- [x] Admin dashboard — SEO audit panel with per-page pass/fail checklist
- [x] Admin dashboard — keyword tracker with Google Search + Maps quick-check links
- [x] Admin dashboard — Google tools panel (Search Console, GA4, GBP direct links)
