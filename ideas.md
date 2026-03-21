# Render King Website — Design Brainstorm

## Design Philosophy Options

<response>
<text>

### Option A — INDUSTRIAL BRUTALISM
**Design Movement:** Industrial Brutalism meets Luxury Trade Brand
**Core Principles:**
1. Raw, heavy black backgrounds with gold as the only warmth
2. Oversized typography that dominates — headlines at 80–120px, all caps, tracking tight
3. Asymmetric layouts with hard edges — no rounded corners, no softness
4. Content blocks separated by full-bleed gold dividers or raw texture overlays

**Color Philosophy:** #0a0a0a near-black dominates 85% of every page. Gold (#c9a84c) is used only for CTAs, stat numbers, and section labels — it feels earned. White text only. No greys.

**Layout Paradigm:** Left-heavy asymmetric grid. Hero text anchored bottom-left. Stats in a right-column vertical stack. Services in a 3-column horizontal strip with hard borders.

**Signature Elements:**
- Full-bleed render texture overlays at 8% opacity on dark sections
- Gold horizontal rule lines (1px) as section separators
- Large bold numerals (10,000+ / 500+) displayed at 96px as visual anchors

**Interaction Philosophy:** Instant, no-nonsense. Hover states reveal gold underlines. No bouncy animations. Smooth 200ms transitions only.

**Animation:** Fade-in on scroll (opacity 0→1, translateY 20px→0). No parallax. No spin. Fast and clean.

**Typography System:** Montserrat 900 for all headings. Montserrat 300 for body. Courier Prime 700 for stat labels and technical callouts.

</text>
<probability>0.08</probability>
</response>

<response>
<text>

### Option B — DARK LUXURY EDITORIAL (CHOSEN)
**Design Movement:** Dark Luxury Editorial — think Lamborghini meets Dulux Acratex
**Core Principles:**
1. Deep charcoal backgrounds with subtle gradient depth (not flat black)
2. Gold accents used with restraint — borders, CTA buttons, section titles only
3. Full-bleed photography sections alternating with dark content sections
4. Strong typographic hierarchy: massive hero type, clean body, gold labels

**Color Philosophy:** Background #0f0f0f to #1a1a1a gradient. Gold #c9a84c for all accents. Pure white for headlines. 72% white for body. The heaviness of black communicates scale and authority — this is not a small operator.

**Layout Paradigm:** Full-width sections stacked vertically. Hero is 100vh with text bottom-left. Stats bar is full-width dark strip. Services use a 2x2 or 4-column card grid with gold left borders. Builder Portal is a distinct dark card with step indicators.

**Signature Elements:**
- Gold left-border callout cards throughout
- Sticky navigation with transparent-to-dark scroll behaviour
- Full-bleed project photography with text overlays using dark gradient masks

**Interaction Philosophy:** Confident and direct. Gold button fills on hover. Cards lift with subtle shadow on hover. Navigation items get gold underline on hover.

**Animation:** Entrance animations on scroll — staggered fade-up for stat numbers, cards, and section headings. Counter animation for 10,000+ and 500+ numbers. Smooth 300ms easing.

**Typography System:** Montserrat 900 ALL CAPS for H1/H2. Montserrat 700 for H3/subheadings. Montserrat 300 for body. Letter-spacing 3–4px on section labels.

</text>
<probability>0.09</probability>
</response>

<response>
<text>

### Option C — PRECISION CRAFT
**Design Movement:** Swiss Grid Precision meets Australian Trade Premium
**Core Principles:**
1. Strict grid system with deliberate white space
2. Typography as the primary visual element — no decoration, just type
3. Monochromatic with single gold accent
4. Data-forward — stats and numbers are the hero

**Color Philosophy:** Near-black #111 background. Single gold accent #c9a84c. Very minimal imagery.

**Layout Paradigm:** 12-column grid, strict alignment. Sidebar navigation on desktop.

**Signature Elements:** Numbered sections, table-style content blocks, minimal iconography.

**Interaction Philosophy:** Keyboard-first, accessibility-focused.

**Animation:** None — static and confident.

**Typography System:** Montserrat exclusively. Extreme weight contrast between 900 and 300.

</text>
<probability>0.04</probability>
</response>

---

## CHOSEN APPROACH: Option B — DARK LUXURY EDITORIAL

**Rationale:** This is the right call for Render King. It communicates scale (massive full-bleed imagery), authority (dark premium aesthetic), and trade professionalism (direct, no-nonsense layout). The gold accents feel earned rather than decorative. The Builder Portal sits naturally as a distinct functional section within this editorial framework.

### Design Tokens for Implementation
- Background: `#0f0f0f` (primary), `#1a1a1a` (cards/sections), `#111111` (nav)
- Gold: `#c9a84c` (primary accent), `#f0d080` (hover/highlight)
- Text: `#ffffff` (headlines), `rgba(255,255,255,0.72)` (body), `rgba(255,255,255,0.45)` (muted)
- Border: `rgba(201,168,76,0.2)` (subtle gold borders)
- Font: Montserrat (Google Fonts) — 900, 700, 400, 300
- Radius: 0 (no rounded corners — industrial edge)
- Transitions: 200–300ms ease
