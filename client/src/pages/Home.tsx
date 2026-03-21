/*
 * RENDER KING — Home Page
 * Dark Luxury Editorial design
 * Full-bleed hero, authority stats, services grid, Sunset Cove case study, clients, CTA
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Shield, Award, Users, Clock } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-render-5VYncEsA98vpANaUphE9kL.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-sunset-cove-Zkx6WQV6sk5aHsnhX6jeYM.webp";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp";

const stats = [
  { number: "10,000+", label: "Projects Completed" },
  { number: "24", label: "Years in the Trade" },
  { number: "100,000+", label: "Combined Hours Delivered" },
  { number: "$1.2M+", label: "Single Project Record" },
];

const services = [
  {
    title: "Acrylic Render",
    desc: "Queensland's most trusted acrylic render applicator. All substrates — brick, block, Hebel, EPS, Blueboard. Dulux Acratex accredited.",
    href: "/services/acrylic-render",
    img: TEXTURE_IMG,
  },
  {
    title: "Hebel Supply & Install",
    desc: "CSR Hebel PowerPanelXL supply and installation for residential and low-rise. Termite resistant, fire rated, fast install.",
    href: "/services/hebel-installation",
    img: HEBEL_IMG,
  },
  {
    title: "EPS Cladding Systems",
    desc: "Full EPS cladding system supply and installation. Lightweight, insulating, cost-effective. Residential and low-rise only.",
    href: "/services/eps-cladding",
    img: HERO_IMG,
  },
  {
    title: "Specialty Finishes",
    desc: "Premium external finishes including external microcement, Dulux Acratex premium systems, and combined render and paint packages.",
    href: "/services/specialty-finishes",
    img: SUNSET_IMG,
  },
];

const clients = [
  "AUSBUILD", "GEM LIFE", "METRICON", "STYLEMASTER",
  "PARADE HOMES", "MCCARTHY HOMES", "TAYLORD CONSTRUCTION",
];

const testimonials = [
  {
    quote: "Render King has been our go-to renderer for years. Their attention to detail and reliability on volume estates is second to none.",
    author: "Site Manager",
    company: "McCarthy Homes",
  },
  {
    quote: "Consistent quality, on time, every time. When you're running a retirement village project, you need a team you can trust. Render King delivers.",
    author: "Project Director",
    company: "Gem Life",
  },
  {
    quote: "We've used Render King across multiple estates. Their Hebel installation work is clean, fast, and the finish quality is outstanding.",
    author: "Construction Manager",
    company: "Taylord Construction",
  },
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  return (
    <span className="rk-gold font-black text-4xl lg:text-5xl rk-heading">
      {target}
    </span>
  );
}

export default function Home() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Dark gradient overlay — bottom-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

        <div className="relative container pb-20 lg:pb-28">
          <div className="max-w-3xl">
            <p className="rk-section-label mb-6">Queensland's Premier Rendering Specialists</p>
            <h1
              className="text-white font-black uppercase leading-none mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
              }}
            >
              BUILT TO LAST.<br />
              <span className="rk-gold">FINISHED TO</span><br />
              IMPRESS.
            </h1>
            <p className="text-white/70 text-base lg:text-lg mb-10 max-w-xl leading-relaxed" style={{ fontWeight: 300 }}>
              From Morayfield to Ipswich, Brisbane to the Gold Coast — Render King delivers acrylic render, Hebel installation, EPS cladding, and specialty finishes across Queensland.
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

        {/* Scroll indicator */}
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
                <CountUp target={s.number} />
                <p className="text-white/50 text-xs uppercase tracking-widest mt-2" style={{ letterSpacing: "0.15em", fontWeight: 600 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container">
          <div className="mb-16 fade-up">
            <p className="rk-section-label mb-3">What We Do</p>
            <h2
              className="text-white font-black uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              COMPLETE WALL SYSTEMS.<br />
              <span className="rk-gold">ONE CREW.</span>
            </h2>
            <div className="rk-divider mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
            {services.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="group relative overflow-hidden bg-[#0f0f0f] block"
                style={{ minHeight: "340px" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20 group-hover:via-[#0a0a0a]/60 transition-all duration-300" />
                <div className="relative p-8 h-full flex flex-col justify-end" style={{ minHeight: "340px" }}>
                  <p className="rk-section-label mb-2">{`0${i + 1}`}</p>
                  <h3
                    className="text-white font-black uppercase mb-3 group-hover:rk-gold transition-colors"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.4rem", letterSpacing: "0.04em" }}
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

      {/* ── SUNSET COVE CASE STUDY ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SUNSET_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-transparent" />

        <div className="relative container py-24 lg:py-32">
          <div className="max-w-2xl fade-up">
            <p className="rk-section-label mb-4">Record-Breaking Project</p>
            <h2
              className="text-white font-black uppercase mb-2"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              SUNSET COVE,
            </h2>
            <h2
              className="rk-gold font-black uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}
            >
              ROBINA.
            </h2>
            <div className="rk-divider mb-8" />
            <p className="text-white/70 text-base leading-relaxed mb-6" style={{ fontWeight: 300 }}>
              Australia's most ambitious 100% microcement home. Six suites. Resort-grade living. Over 10,000 hours of artistry on a single project. $1.2M+ in microcement alone. Featured on Channel 9. Sold at auction.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Delivered by the Render King and Micro Cement King teams under the Render Render Pty Ltd umbrella. This is the proof that no competitor can match.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { n: "10,000+", l: "Hours on Site" },
                { n: "$1.2M+", l: "Project Value" },
                { n: "100%", l: "Microcement Finish" },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-[#c9a84c] pl-4">
                  <div className="rk-gold font-black text-xl rk-heading">{s.n}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="/portfolio" className="rk-btn-gold">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY RENDER KING ── */}
      <section className="py-24 bg-[#111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="rk-section-label mb-3">Why Render King</p>
              <h2
                className="text-white font-black uppercase mb-6"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.03em" }}
              >
                QUEENSLAND'S LARGEST<br />
                <span className="rk-gold">RENDERING OPERATION.</span>
              </h2>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                Matty Mannion started in the trade and built one of Queensland's largest rendering operations from the ground up. 24 years. Two render jobs a week for 20 years — that's over 2,000 jobs personally. With crews running 4–5 jobs a week for the past 8 years, we've crossed 10,000 projects combined.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                We service Greater Brisbane, Morayfield to Ipswich, and down to the Gold Coast. New managers are being placed to continue our Queensland expansion.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Shield size={18} className="rk-gold" />, title: "Safety First", desc: "PSRA compliant. Full safety documentation on every site." },
                  { icon: <Award size={18} className="rk-gold" />, title: "Dulux Acratex Accredited", desc: "Manufacturer-certified applicator. Warranty-backed work." },
                  { icon: <Users size={18} className="rk-gold" />, title: "Volume Builder Trusted", desc: "Ausbuild, Metricon, Gem Life, Stylemaster and more." },
                  { icon: <Clock size={18} className="rk-gold" />, title: "On Time, Every Time", desc: "Systems-driven operation. No delays, no excuses." },
                ].map((item, i) => (
                  <div key={i} className="rk-card fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="mb-3">{item.icon}</div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2" style={{ letterSpacing: "0.08em" }}>{item.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative fade-up">
              <div
                className="w-full aspect-[4/5] bg-cover bg-center"
                style={{ backgroundImage: `url(${HEBEL_IMG})` }}
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c9a84c] p-6 hidden lg:block">
                <div className="text-[#0f0f0f] font-black text-3xl rk-heading">24</div>
                <div className="text-[#0f0f0f] text-xs font-bold uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="py-16 bg-[#0f0f0f] border-y border-white/6">
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
      <section className="py-24 bg-[#111]">
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

      {/* ── MICRO CEMENT KING CROSS-REFERENCE ── */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/6">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="rk-section-label mb-3">Specialty Internal Finishes</p>
              <h3
                className="text-white font-black uppercase mb-3"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.5rem", letterSpacing: "0.04em" }}
              >
                NEED INTERNAL POLISHED WALLS OR FLOORS?
              </h3>
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                For external microcement on facades, pools, and outdoor areas — our Render King team delivers. For internal polished walls, floors, and bespoke surfaces, visit our sister brand{" "}
                <span className="text-white font-semibold">Micro Cement King</span>. Same ownership. Same standard. Different speciality.
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
            Upload your plans, specs, or photos. Our estimating team will review and respond promptly. Builders — use our portal for instant project lodgement.
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
