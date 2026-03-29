/*
 * RENDER KING — Home Page v3
 * All visual editor feedback applied:
 * - Hero: luxury home, correct text formatting
 * - Services: Render + Texture first, Specialty Finishes separate, Hebel/EPS as add-ons at bottom
 * - Pain points: solution-focused, not competitor-bagging
 * - Portfolio: new aspirational images with landscaping and colour
 * - Clients: real logos section with supplier badges
 * - MCK cross-ref: statement, not question
 * - Contact: real phone 0468 041 477 / projects@renderrender.com.au
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Clock, Users, Phone, Zap, Shield, Award, Star } from "lucide-react";

// v5 CDN images
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-v4-premium-kdDLtzCBsKFqnPhHy8aUQV.webp";
const PROCESS_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-process-1-aac-7dTG3Bu8X4Ym435zuUn4vQ.webp";
const PROCESS_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-process-2-basecoat-FEz4Qu65L6RV5A9SfPSKN9.webp";
const PROCESS_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-process-3-finish-6MLu7EbQV4jh5e2ZPzwwUk.webp";
const PROCESS_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-process-4-complete-cEShehPmaHYGxUNrCLcw6H.webp";
const ESTATE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-portfolio-estate_5d030290.jpg";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-texture-dYRg9c2L9YQeJmNNKeihRX.webp";
const LOWSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-portfolio-lowset_aac85414.jpg";
const LUXURY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-portfolio-luxury_bbf00cbd.jpg";
const DOUBLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-portfolio-double_28fce4a5.jpg";
// v5 new images
const HEBEL_EXT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v5-hebel-ext-A2fAKtWLE56ZGerSS5wATV.webp";
const SPECIALTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v5-specialty-nLnV5V4SxfyvNMqaujRPMB.webp";
const MCK_INTERIOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v5-mck-interior-AtK2iELuNMJStqtcCvEnm9.webp";

const stats = [
  { number: "10,000+", label: "Projects Completed" },
  { number: "24", label: "Years in the Trade" },
  { number: "4–5", label: "Jobs Per Week" },
  { number: "100,000+", label: "Combined Hours" },
];

// Services — correct hierarchy
const coreServices = [
  {
    title: "Acrylic Render",
    desc: "Queensland's most trusted acrylic render applicator. All substrates — brick, block, Hebel, EPS, Blueboard. Dulux Acratex accredited. Volume estates to custom builds.",
    href: "/services/acrylic-render",
    img: DOUBLE_IMG,
    badge: "Core Service",
  },
  {
    title: "Texture Coatings",
    desc: "Full range of texture coat systems — fine sand, medium sand, rough cast, and premium Dulux Acratex finishes. Consistent lot-to-lot colour and texture matching across every stage.",
    href: "/services/acrylic-render",
    img: TEXTURE_IMG,
    badge: "Core Service",
  },
  {
    title: "Specialty Finishes",
    desc: "Premium external finishes including Dulux Acratex premium systems, combined render and paint packages and external microcement on facades, pools, and outdoor areas.",
    href: "/services/specialty-finishes",
    img: SPECIALTY_IMG,
    badge: "Premium Finish",
  },
];

const addOnServices = [
  {
    title: "Hebel Supply & Install",
    desc: "We work with selected builders on the whole wall system — Hebel supply, install, and render under one subcontractor. Focused delivery, no handoff gaps.",
    href: "/services/hebel-installation",
    img: HEBEL_EXT_IMG,
  },
  {
    title: "EPS Cladding Systems",
    desc: "Full EPS cladding system supply and installation. Lightweight, insulating, cost-effective. Residential and low-rise only. Supplied and installed, then rendered by our crew.",
    href: "/services/eps-cladding",
    img: ESTATE_IMG,
  },
];

// Pain points — solution-focused, no competitor-bagging
const deliveryPoints = [
  {
    icon: <Zap size={20} className="rk-gold" />,
    title: "We Show Up",
    desc: "Scheduled crews. Confirmed bookings. Your site manager knows exactly when we're on site — and we're there.",
  },
  {
    icon: <CheckCircle size={20} className="rk-gold" />,
    title: "Consistent Finish",
    desc: "Same crew, same product, same process. Dulux Acratex accredited. Colour and texture matched across every lot on your estate.",
  },
  {
    icon: <Phone size={20} className="rk-gold" />,
    title: "Direct Communication",
    desc: "One point of contact. You know the schedule, the progress, and any updates before they become your problem.",
  },
  {
    icon: <Users size={20} className="rk-gold" />,
    title: "Built for Volume",
    desc: "Multiple crews running 4–5 jobs per week across Greater Brisbane. Volume is what we're built for — and what we've done for 24 years.",
  },
];

const clients = [
  "AUSBUILD", "GEM LIFE", "METRICON", "STYLEMASTER",
  "PARADE HOMES", "MCCARTHY HOMES", "TAYLORD CONSTRUCTION",
];

const testimonials = [
  {
    quote: "Render King has been our go-to renderer for years. Reliable, consistent, and they communicate. On a volume estate, that's everything.",
    author: "Site Manager",
    company: "McCarthy Homes",
    stars: 5,
  },
  {
    quote: "When you're running a retirement village, you need a subcontractor you can set and forget. Render King shows up, does the job, and doesn't create problems.",
    author: "Project Director",
    company: "Gem Life",
    stars: 5,
  },
  {
    quote: "We've used Render King across multiple estates from Morayfield to the Gold Coast. Consistent quality, on time, and the finish holds up.",
    author: "Construction Manager",
    company: "Taylord Construction",
    stars: 5,
  },
];

// Portfolio — mix of volume, low-set, double-storey, luxury
const portfolioItems = [
  { img: DOUBLE_IMG, label: "Double Storey Estate — Coomera" },
  { img: ESTATE_IMG, label: "Volume Estate — North Brisbane" },
  { img: LOWSET_IMG, label: "Low-Set Residential — Springfield" },
  { img: LUXURY_IMG, label: "Luxury Custom Build — Gold Coast" },
  { img: HERO_IMG, label: "Premium Architectural Render — Robina" },
  { img: HEBEL_EXT_IMG, label: "Hebel External Install — Ipswich" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />

      {/* ── HERO ── */}
      {/* Full-bleed hero: image intentionally extends behind transparent nav for cinematic effect */}
      <section className="relative h-screen min-h-[620px] flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Strong bottom gradient for text legibility, lighter top to show the home */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-transparent" />

        <div className="relative container mt-auto pb-20 lg:pb-28" style={{paddingTop: '60px', marginTop: '130px'}}>
          <div className="max-w-3xl" style={{paddingBottom: '100px'}}>
            <p className="rk-section-label mb-5">Queensland's Largest Rendering Operation</p>
            <h1
              className="text-white font-black uppercase mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
                letterSpacing: "0.02em",
                lineHeight: 0.93,
              }}
            >
              YOUR BUILDS.{" "}
              <span className="rk-gold">FINISHED FASTER.</span>
            </h1>
            <p className="text-white/70 text-base lg:text-lg mb-4 max-w-xl leading-relaxed" style={{ fontWeight: '500', color: '#faf9f9', fontSize: '20px' }}>
              Volume builders across Queensland trust Render King to show up on schedule, communicate clearly, and deliver a consistent finish - every lot, every time.
            </p>
            <p className="text-white/50 text-sm mb-10 max-w-xl leading-relaxed" style={{ fontWeight: 300, color: '#d9d9d9', fontSize: '18px' }}>
              24 years.  10,000+ projects. 4–5 jobs a week across Greater Brisbane, Morayfield to Ipswich, and down to the Gold Coast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/submit-project" className="rk-btn-gold">
                Submit a Project
              </Link>
              <a href="tel:0468041477" className="rk-btn-outline">
                Call Us Now
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a84c]" />
          <span className="rk-section-label" style={{ writingMode: "vertical-rl", fontSize: "0.6rem" }}>Scroll</span>
        </div>
      </section>

      {/* ── AI INTEGRATION STRIP ── */}
      <section className="py-10 bg-[#0a0a0a] border-b border-white/6">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center border border-[#c9a84c]/40 shrink-0">
                <Zap size={14} className="rk-gold" />
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-0.5" style={{ letterSpacing: "0.14em" }}>Leading with AI Integration</p>
                <p className="text-white/45 text-xs" style={{ fontWeight: 300, paddingTop: '10px', color: '#e6e6e6', fontSize: '16px' }}>Real-time job reporting, automated customer communication, digital safety compliance, and live project tracking - built into every job.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 shrink-0">
              {["AI Job Reporting", "Safety Compliant", "Digital PSRAs", "Live Communication"].map((tag, i) => (
                <span key={i} className="text-white/30 text-xs font-bold uppercase tracking-widest" style={{ letterSpacing: "0.12em", color: '#ffffff', fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHORITY STATS BAR ── */}
      <section className="bg-[#111] border-y border-white/8">
        <div className="container py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="text-center lg:px-8 fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="rk-gold font-black text-4xl lg:text-5xl rk-heading">{s.number}</span>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-2" style={{ letterSpacing: "0.15em", fontWeight: 600 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE DELIVER ── */}
      <section className="py-24 bg-[#0f0f0f]" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="rk-section-label mb-3">How We Deliver</p>
              <h2
                className="text-white font-black uppercase mb-6"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.03em" }}
              >
                ABOVE EXPECTATIONS.{" "}
                <span className="rk-gold">EVERY JOB.</span>
              </h2>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300, color: '#fafafa' }}>
                We've built our reputation on one thing: doing exactly what we say we'll do, to the standard we say we'll deliver, on the day we say we'll be there. That's not a promise - it's how we've run 10,000 projects.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliveryPoints.map((p, i) => (
                  <div key={i} className="rk-card fade-up" style={{ transitionDelay: `${i * 70}ms` }}>
                    <div className="mb-3">{p.icon}</div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2" style={{ letterSpacing: "0.08em" }}>{p.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Flow — AAC → Basecoat → Finish → Complete */}
            <div className="fade-up">
              <div className="grid grid-cols-2 gap-1">
                {[
                  { img: PROCESS_1, step: "01", label: "AAC / Hebel Install" },
                  { img: PROCESS_2, step: "02", label: "Basecoat Applied" },
                  { img: PROCESS_3, step: "03", label: "Finish Render" },
                  { img: PROCESS_4, step: "04", label: "Completed" },
                ].map((p, i) => (
                  <div key={i} className="relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${p.img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <span className="rk-gold font-black text-xs" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.1em" }}>{p.step}</span>
                      <p className="text-white text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ letterSpacing: "0.08em", fontSize: "0.65rem" }}>{p.label}</p>
                    </div>
                    {i === 3 && (
                      <div className="absolute top-2 right-2 bg-[#c9a84c] px-2 py-0.5">
                        <span className="text-[#0f0f0f] text-xs font-black uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>Done</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs text-center mt-3 uppercase tracking-widest" style={{ letterSpacing: "0.12em", fontSize: "0.65rem", color: '#fcfcfc' }}>From substrate to completion — one crew, one call</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES ── */}
      <section className="py-24 bg-[#111]" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="rk-section-label mb-3">What We Do</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              RENDER FIRST.{" "}
              <span className="rk-gold">EVERYTHING ELSE FOLLOWS.</span>
            </h2>
            <div className="rk-divider mt-4" />
            <p className="text-white/50 text-sm mt-6 max-w-2xl leading-relaxed" style={{ fontWeight: 300, color: '#f8f7f7' }}>
              Acrylic render and texture coatings are our core. It's what we've built our reputation on across 10,000 projects. Specialty finishes, Hebel, and EPS installation are offered as a convenience - one subcontractor for your entire wall system.
            </p>
          </div>

          {/* Core services — 3 across */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 mb-px">
            {coreServices.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="group relative overflow-hidden bg-[#111] block"
                style={{ minHeight: "360px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/72 to-[#0a0a0a]/15 group-hover:via-[#0a0a0a]/60 transition-all duration-300" />
                <div className="relative p-8 h-full flex flex-col justify-end" style={{ minHeight: "360px" }}>
                  <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 px-2 py-1 ${s.badge === "Core Service" ? "bg-[#c9a84c] text-[#0f0f0f]" : "bg-white/15 text-white/80"}`} style={{ letterSpacing: "0.12em", backgroundColor: '#c9a84c', color: '#0f0f0f' }}>
                    {s.badge}
                  </span>
                  <h3
                    className="text-white font-black uppercase mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.3rem", letterSpacing: "0.04em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                    {s.desc}
                  </p>
                  <span className="rk-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all" style={{ letterSpacing: "0.12em" }}>
                    Learn More <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Add-on services — 2 across, smaller */}
          <div className="mt-4">
            <p className="rk-section-label mb-4">Wall System Add-Ons</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
              {addOnServices.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="group relative overflow-hidden bg-[#0f0f0f] block"
                  style={{ minHeight: "220px" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/20" />
                  <div className="relative p-8 h-full flex flex-col justify-end" style={{ minHeight: "220px" }}>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-2 py-1 bg-white/10 text-white/60" style={{ letterSpacing: "0.12em", color: '#faf9f9' }}>
                      Wall Systems
                    </span>
                    <h3
                      className="text-white font-black uppercase mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.1rem", letterSpacing: "0.04em" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-white/55 text-xs leading-relaxed mb-3" style={{ fontWeight: 300 }}>
                      {s.desc}
                    </p>
                    <span className="rk-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all" style={{ letterSpacing: "0.12em" }}>
                      Learn More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCALE & COVERAGE ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ESTATE_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/96 via-[#0a0a0a]/80 to-transparent" />

        <div className="relative container py-24 lg:py-32" style={{paddingTop: '80px', paddingBottom: '80px'}}>
          <div className="max-w-2xl fade-up">
            <p className="rk-section-label mb-4">Scale & Coverage</p>
            <h2
              className="text-white font-black uppercase mb-2"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              GREATER BRISBANE.
            </h2>
            <h2
              className="rk-gold font-black uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              MORAYFIELD TO 
GOLD COAST.
            </h2>
            <div className="rk-divider mb-8" />
            <p className="text-white/70 text-base leading-relaxed mb-6" style={{ fontWeight: 300 }}>
              Our primary focus is Greater Brisbane and the volume corridors — Morayfield, North Lakes, Ipswich, Springfield, Logan, and down to the Gold Coast. We run multiple crews simultaneously and are actively placing new managers to expand our Queensland coverage.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Matty Mannion started in the trade and built one of Queensland's largest rendering operations from the ground up. Two render jobs a week personally for 20 years — over 2,000 jobs. With crews running 4–5 jobs a week for the past 8 years, we've crossed 10,000 projects combined.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { n: "10,000+", l: "Combined Projects" },
                { n: "Multiple", l: "Active Crews" },
                { n: "QLD-Wide", l: "Coverage" },
                { n: "Dulux", l: "Acratex Accredited" },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-[#c9a84c] pl-4">
                  <div className="rk-gold font-black text-xl rk-heading">{s.n}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="rk-btn-gold">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section className="py-24 bg-[#0f0f0f]" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="container">
          <div className="mb-12 fade-up">
            <p className="rk-section-label mb-3">Our Work</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              VOLUME ESTATES.{" "}
              <span className="rk-gold">CUSTOM BUILDS. LOW-SET. HIGH-END.</span>
            </h2>
            <div className="rk-divider mt-4" />
            <p className="text-white/50 text-sm mt-4 max-w-xl" style={{ fontWeight: 300 }}>
              From 4-lot stages to 200-lot estates. From low-set brick veneer to luxury architectural renders. We do both — at the same standard.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {portfolioItems.map((item, i) => (
              <div key={i} className="relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/55 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-bold uppercase tracking-wider" style={{ letterSpacing: "0.1em" }}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/portfolio" className="rk-btn-outline">
              View Full Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="py-16 bg-[#111] border-y border-white/6">
        <div className="container">
          <p className="rk-section-label text-center mb-10">TRUSTED ON SITE.<br />PROVEN IN THE FIELD.</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-4 lg:gap-7">
              {clients.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="text-white/25 hover:text-white/60 font-black uppercase text-sm tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em", color: '#cfcfcf' }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center gap-4 lg:gap-7">
              {clients.slice(4).map((c, i) => (
                <span
                  key={i}
                  className="text-white/25 hover:text-white/60 font-black uppercase text-sm tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em", color: '#cfcfcf' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#0f0f0f]" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="rk-section-label mb-3">What Builders Say</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              TRUSTED ON SITE.{" "}
              <span className="rk-gold">PROVEN IN THE FIELD.</span>
            </h2>
            <div className="rk-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rk-card fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={12} className="fill-[#c9a84c] text-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                  "{t.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-bold text-xs uppercase tracking-wider" style={{ letterSpacing: "0.1em" }}>{t.author}</p>
                  <p className="rk-gold text-xs mt-1" style={{ fontWeight: 600 }}>{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="py-20 bg-[#111]" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={20} className="rk-gold" />, title: "Safety Compliant", desc: "PSRA on every job. SWMS, inductions, and full safety documentation on every site." },
              { icon: <Award size={20} className="rk-gold" />, title: "Dulux Acratex Accredited", desc: "Manufacturer-certified applicator. Warranty-backed work on every project." },
              { icon: <Clock size={20} className="rk-gold" />, title: "On Time, Every Time", desc: "Systems-driven scheduling. No surprises for your site manager." },
              { icon: <Users size={20} className="rk-gold" />, title: "Multiple Crews", desc: "We scale with your program. Volume is what we're built for." },
            ].map((item, i) => (
              <div key={i} className="rk-card text-center fade-up" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wide mb-2" style={{ letterSpacing: "0.08em" }}>{item.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MICRO CEMENT KING CROSS-REFERENCE ── */}
      <section className="py-0 bg-[#0a0a0a] border-y border-white/6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image side */}
          <div
            className="relative min-h-[320px] lg:min-h-[420px] bg-cover bg-center"
            style={{ backgroundImage: `url(${MCK_INTERIOR_IMG})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/60" />
            <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
          </div>
          {/* Text side */}
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
            <p className="rk-section-label mb-3">Premium Internal Finishes</p>
            <h3
              className="text-white font-black uppercase mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "0.04em", lineHeight: 1.1 }}
            >
              SEAMLESS FLOORS.
              <br />
              <span className="rk-gold">POLISHED WALLS.</span>
              <br />
              BESPOKE SURFACES.
            </h3>
            <div className="rk-divider mb-6" />
            <p className="text-white/55 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Our Render King team delivers external microcement on facades, pools, and outdoor areas. For internal polished walls, floors, and luxury architectural surfaces,{" "}
              <span className="text-white font-semibold">Micro Cement King</span> is Queensland's premier internal microcement studio. Same ownership. Same standard. Different speciality.
            </p>
            <a
              href="https://microcementking.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="rk-btn-outline self-start"
            >
              Visit Micro Cement King →
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-[#0f0f0f]" style={{paddingTop: '80px', paddingBottom: '80px'}}>
        <div className="container text-center fade-up">
          <p className="rk-section-label mb-4">Ready to Get Started?</p>
          <h2
            className="text-white font-black uppercase mb-6"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}
          >
            SUBMIT YOUR PROJECT.{" "}
            <span className="rk-gold">GET A QUOTE FAST.</span>
          </h2>
          <p className="text-white/50 text-sm mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontWeight: 300, color: '#fafafa' }}>
            Upload your plans, specs, or photos. Our estimating team will review and respond within 1 business day. Volume builders — use our portal for instant project lodgement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit-project" className="rk-btn-gold">
              Submit a Project
            </Link>
            <a href="tel:0468041477" className="rk-btn-outline">
              Call 0468 041 477
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
