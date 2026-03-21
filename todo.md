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
