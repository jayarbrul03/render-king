/*
 * RENDER KING — Home Page v2
 * Corrected messaging: Render first. Volume builder pain points.
 * Speed. Consistency. Communication. Crew size. Scale.
 * No Sunset Cove (MCK story). Mix of volume + quality imagery.
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Clock, Users, Phone, Zap, Shield, Award } from "lucide-react";

// v2 corrected images — volume residential, real render work
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-hero-6jYCUF44EYhoRu8gvPANq9.webp";
const ESTATE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-estate-JUgBRcX8MbyqQxbsp2dh3F.webp";
const CREW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-crew-85TRdReUj7gJdkTizPmksY.webp";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-texture-dYRg9c2L9YQeJmNNKeihRX.webp";
const LOWSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-lowset-JwsWjD7Y8SXnHtdHRnyyKq.webp";
const LUXURY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-luxury-eRmKZ4GLPaQDzSEB5SasEF.webp";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-hebel-KhTNFiwZQmtUKssEyHWrkm.webp";

const stats = [
  { number: "10,000+", label: "Projects Completed" },
  { number: "24", label: "Years in the Trade" },
  { number: "4–5", label: "Jobs Per Week" },
  { number: "100,000+", label: "Combined Hours Delivered" },
];

// Services — Render dominant, installations as add-on
const services = [
  {
    title: "Acrylic Render",
    desc: "Queensland's most trusted acrylic render applicator. All substrates — brick, block, Hebel, EPS, Blueboard. Dulux Acratex accredited. Volume estates to custom builds.",
    href: "/services/acrylic-render",
    img: ESTATE_IMG,
    badge: "Core Service",
  },
  {
    title: "Texture Coatings",
    desc: "Full range of texture coat systems — fine sand, medium sand, rough cast, and premium Dulux Acratex finishes. Consistent lot-to-lot colour and texture matching.",
    href: "/services/acrylic-render",
    img: TEXTURE_IMG,
    badge: "Core Service",
  },
  {
    title: "Hebel Supply & Install",
    desc: "CSR Hebel PowerPanelXL supply and installation for residential and low-rise. Termite resistant, fire rated, fast install. One subcontractor for wall system and render.",
    href: "/services/hebel-installation",
    img: HEBEL_IMG,
    badge: "Wall Systems",
  },
  {
    title: "EPS Cladding & Specialty Finishes",
    desc: "Full EPS cladding system supply and installation. External microcement and premium specialty finishes. Residential and low-rise only.",
    href: "/services/eps-cladding",
    img: LUXURY_IMG,
    badge: "Wall Systems",
  },
];

// Volume builder pain points — what we solve
const painPoints = [
  {
    icon: <Zap size={20} className="rk-gold" />,
    problem: "Renderer doesn't show up",
    solution: "We run systems, not hope. Scheduled crews. Confirmed bookings. You know exactly when we're on site.",
  },
  {
    icon: <CheckCircle size={20} className="rk-gold" />,
    problem: "Inconsistent finish lot to lot",
    solution: "Same crew, same product, same process. Dulux Acratex accredited. Colour and texture matched across every lot on your estate.",
  },
  {
    icon: <Phone size={20} className="rk-gold" />,
    problem: "Can't get a straight answer",
    solution: "Direct communication. One point of contact. You know the schedule, the progress, and any issues before they become your problem.",
  },
  {
    icon: <Users size={20} className="rk-gold" />,
    problem: "Can't handle our volume",
    solution: "Multiple crews running 4–5 jobs per week across Greater Brisbane. We've been doing it for 24 years. Volume is what we're built for.",
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
  },
  {
    quote: "When you're running a retirement village, you need a subcontractor you can set and forget. Render King shows up, does the job, and doesn't create problems.",
    author: "Project Director",
    company: "Gem Life",
  },
  {
    quote: "We've used Render King across multiple estates from Morayfield to the Gold Coast. Consistent quality, on time, and the finish holds up.",
    author: "Construction Manager",
    company: "Taylord Construction",
  },
];

// Portfolio gallery — mix of volume and quality
const portfolioItems = [
  { img: HERO_IMG, label: "Double Storey Estate — Coomera" },
  { img: ESTATE_IMG, label: "Volume Estate — North Brisbane" },
  { img: LOWSET_IMG, label: "Low-Set Residential — Springfield" },
  { img: LUXURY_IMG, label: "Luxury Custom Build — Gold Coast" },
  { img: CREW_IMG, label: "Crew on Site — Active Build" },
  { img: HEBEL_IMG, label: "Hebel External Install — Ipswich" },
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
      <section className="relative h-screen min-h-[620px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-transparent to-transparent" />

        <div className="relative container pb-20 lg:pb-28">
          <div className="max-w-3xl">
            <p className="rk-section-label mb-5">Queensland's Largest Rendering Operation</p>
            <h1
              className="text-white font-black uppercase leading-none mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                letterSpacing: "0.02em",
                lineHeight: 0.93,
              }}
            >
              RENDER DONE RIGHT.<br />
              <span className="rk-gold">EVERY TIME.</span>
            </h1>
            <p className="text-white/70 text-base lg:text-lg mb-10 max-w-xl leading-relaxed" style={{ fontWeight: 300 }}>
              24 years. 10,000+ projects. 4–5 jobs a week across Greater Brisbane, Morayfield to Ipswich, and down to the Gold Coast. Volume builders trust us because we show up, we communicate, and the finish is right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/submit-project" className="rk-btn-gold">
                Submit a Project
              </Link>
              <Link href="/portfolio" className="rk-btn-outline">
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a84c]" />
          <span className="rk-section-label" style={{ writingMode: "vertical-rl", fontSize: "0.6rem" }}>Scroll</span>
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

      {/* ── WHAT VOLUME BUILDERS ACTUALLY NEED ── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="rk-section-label mb-3">The Problem We Solve</p>
              <h2
                className="text-white font-black uppercase mb-6"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.03em" }}
              >
                VOLUME BUILDERS NEED<br />
                <span className="rk-gold">ONE LESS PROBLEM.</span>
              </h2>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Most renderers are a one-man band. They disappear mid-job, miss schedules, and leave your site manager chasing a phone that doesn't get answered. That's not a render problem — that's a systems problem. We fixed it.
              </p>
              <div className="space-y-4">
                {painPoints.map((p, i) => (
                  <div key={i} className="rk-card fade-up" style={{ transitionDelay: `${i * 70}ms` }}>
                    <div className="flex gap-4">
                      <div className="shrink-0 mt-0.5">{p.icon}</div>
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1 line-through" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>
                          {p.problem}
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                          {p.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative fade-up">
              <div
                className="w-full aspect-[4/5] bg-cover bg-center"
                style={{ backgroundImage: `url(${CREW_IMG})` }}
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c9a84c] p-6 hidden lg:block">
                <div className="text-[#0f0f0f] font-black text-3xl rk-heading">24</div>
                <div className="text-[#0f0f0f] text-xs font-bold uppercase tracking-wider">Years on the Tools</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-[#111]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="rk-section-label mb-3">What We Do</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              RENDER IS THE CORE.<br />
              <span className="rk-gold">WALL SYSTEMS ARE THE ADD-ON.</span>
            </h2>
            <div className="rk-divider mt-4" />
            <p className="text-white/50 text-sm mt-6 max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
              We are first and foremost a rendering company. Acrylic render and texture coatings are what we've built our reputation on. Hebel and EPS installation are offered as a convenience — one subcontractor for your entire wall system, from panel to finished render.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
            {services.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="group relative overflow-hidden bg-[#111] block"
                style={{ minHeight: "320px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/72 to-[#0a0a0a]/20 group-hover:via-[#0a0a0a]/60 transition-all duration-300" />
                <div className="relative p-8 h-full flex flex-col justify-end" style={{ minHeight: "320px" }}>
                  <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 px-2 py-1 ${s.badge === "Core Service" ? "bg-[#c9a84c] text-[#0f0f0f]" : "bg-white/10 text-white/60"}`} style={{ letterSpacing: "0.12em" }}>
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
        </div>
      </section>

      {/* ── SCALE & COVERAGE ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ESTATE_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-transparent" />

        <div className="relative container py-24 lg:py-32">
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
              MORAYFIELD TO GOLD COAST.
            </h2>
            <div className="rk-divider mb-8" />
            <p className="text-white/70 text-base leading-relaxed mb-6" style={{ fontWeight: 300 }}>
              Our primary focus is Greater Brisbane and the volume corridors — Morayfield, North Lakes, Ipswich, Springfield, Logan, and down to the Gold Coast. We run multiple crews simultaneously and are actively placing new managers to expand our Queensland coverage.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Matty Mannion started in the trade and built one of Queensland's largest rendering operations from the ground up. 24 years. Two render jobs a week personally for 20 years — over 2,000 jobs. With crews running 4–5 jobs a week for the past 8 years, we've crossed 10,000 projects combined.
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
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container">
          <div className="mb-12 fade-up">
            <p className="rk-section-label mb-3">Our Work</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              VOLUME ESTATES.<br />
              <span className="rk-gold">CUSTOM BUILDS. LOW-SET. HIGH-END.</span>
            </h2>
            <div className="rk-divider mt-4" />
            <p className="text-white/50 text-sm mt-4 max-w-xl" style={{ fontWeight: 300 }}>
              From 4-lot stages to 200-lot estates. From low-set brick veneer to luxury architectural renders. We do both — and we do them at the same standard.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {portfolioItems.map((item, i) => (
              <div key={i} className="relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/60 transition-all duration-300" />
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
          <p className="rk-section-label text-center mb-10">Trusted by Queensland's Leading Builders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {clients.map((c, i) => (
              <span
                key={i}
                className="text-white/25 hover:text-white/60 font-black uppercase text-sm tracking-widest transition-colors duration-200"
                style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="rk-section-label mb-3">What Builders Say</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              TRUSTED ON SITE.<br />
              <span className="rk-gold">PROVEN IN THE FIELD.</span>
            </h2>
            <div className="rk-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rk-card fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="rk-gold text-3xl font-black mb-4 leading-none">"</div>
                <p className="text-white/70 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                  {t.quote}
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

      {/* ── WHY RENDER KING — TRUST SIGNALS ── */}
      <section className="py-20 bg-[#111]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={20} className="rk-gold" />, title: "Safety Compliant", desc: "PSRA on every job. SWMS, inductions, and full safety documentation." },
              { icon: <Award size={20} className="rk-gold" />, title: "Dulux Acratex Accredited", desc: "Manufacturer-certified. Warranty-backed work on every project." },
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
      <section className="py-14 bg-[#0a0a0a] border-y border-white/6">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="rk-section-label mb-3">Specialty Internal Finishes</p>
              <h3
                className="text-white font-black uppercase mb-3"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.4rem", letterSpacing: "0.04em" }}
              >
                NEED INTERNAL POLISHED WALLS OR FLOORS?
              </h3>
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                Our Render King team handles external microcement on facades, pools, and outdoor areas. For internal polished walls, floors, and bespoke surfaces, visit our sister brand{" "}
                <span className="text-white font-semibold">Micro Cement King</span> — one of Queensland's largest render companies also operating in premium internal finishes. Same ownership. Same standard.
              </p>
            </div>
            <a
              href="https://microcement.king"
              target="_blank"
              rel="noopener noreferrer"
              className="rk-btn-outline shrink-0"
            >
              Visit Micro Cement King →
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container text-center fade-up">
          <p className="rk-section-label mb-4">Ready to Get Started?</p>
          <h2
            className="text-white font-black uppercase mb-6"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}
          >
            SUBMIT YOUR PROJECT.<br />
            <span className="rk-gold">GET A QUOTE FAST.</span>
          </h2>
          <p className="text-white/50 text-sm mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Upload your plans, specs, or photos. Our estimating team will review and respond within 1 business day. Volume builders — use our portal for instant project lodgement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit-project" className="rk-btn-gold">
              Submit a Project
            </Link>
            <Link href="/contact" className="rk-btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
