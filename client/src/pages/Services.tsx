/*
 * RENDER KING — Combined Services Page
 * All 4 services stacked on one page, no pricing, no separate sub-pages needed
 */
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-render-5VYncEsA98vpANaUphE9kL.webp";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-sunset-cove-Zkx6WQV6sk5aHsnhX6jeYM.webp";

const acrylicSubstrates = ["Brick Veneer", "Concrete Block", "Hebel / AAC", "EPS Cladding", "Blueboard / FC Sheet", "Besser Block"];
const acrylicSystems = [
  { name: "Dulux Acratex Acrylic Render", desc: "Queensland's most trusted acrylic render system. Manufacturer-backed warranty on every job. Available in all standard and custom textures." },
  { name: "Texture Coatings", desc: "Fine, medium, and coarse texture finishes. Applied direct to prepared substrates. Suitable for all residential and low-rise construction." },
  { name: "Dulux Acratex Premium Range", desc: "Top-tier Acratex systems for premium residential and architectural projects where finish quality is the priority." },
];

const hebelBenefits = [
  "Lightweight — reduces structural load vs masonry",
  "Termite resistant and fire rated",
  "Fast to install — reduces program time",
  "One subcontractor from panel to finished render",
  "CSR Hebel PowerPanelXL — residential and low-rise only",
];

const epsComponents = ["EPS Panels", "Fibreglass Mesh", "Base Coat", "Acrylic Render Finish", "Corner Beads & Trims", "Fixings & Adhesive"];
const epsBenefits = [
  { t: "Lightweight", d: "Reduces structural load compared to masonry systems." },
  { t: "Thermal Insulation", d: "Significantly improves building energy efficiency." },
  { t: "Cost-Effective", d: "Lower material and labour cost than Hebel for many applications." },
  { t: "Design Flexibility", d: "Can achieve complex profiles, reveals, and architectural details." },
];

const specialtyServices = [
  { t: "Dulux Acratex Premium Systems", d: "Top-tier Acratex product range for premium residential and architectural projects." },
  { t: "Combined Render & Paint Packages", d: "Full exterior package — render, prime, and paint in one contract." },
  { t: "External Microcement", d: "Microcement on facades, pool surrounds, and outdoor feature walls. Delivered by our Render King team." },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <SEO
        title="Our Services | Render King — Acrylic Render, Hebel, EPS & Specialty Finishes"
        description="Render King delivers acrylic render, Hebel supply and install, EPS cladding systems, and specialty finishes across Brisbane, Gold Coast, and Queensland. Volume builders and residential construction."
        canonical="https://renderking.au/services"
      />
      <Navigation />

      {/* Page Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" />
        <div className="relative container" style={{ paddingTop: "70px" }}>
          <p className="rk-section-label mb-3">What We Do</p>
          <h1 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            OUR<br /><span className="rk-gold">SERVICES.</span>
          </h1>
          <div className="rk-divider mb-6" />
          <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
            Four core services. One subcontractor. Residential and low-rise construction across Queensland — from volume estates to custom builds.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-8 bg-[#111] border-y border-white/5">
        <div className="container">
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Acrylic Render", anchor: "#acrylic-render" },
              { label: "Hebel Supply & Install", anchor: "#hebel" },
              { label: "EPS Cladding", anchor: "#eps-cladding" },
              { label: "Specialty Finishes", anchor: "#specialty-finishes" },
            ].map((item) => (
              <a
                key={item.anchor}
                href={item.anchor}
                className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 transition-all duration-200"
                style={{ letterSpacing: "0.10em" }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE 1: ACRYLIC RENDER ── */}
      <section id="acrylic-render" className="py-20 bg-[#0f0f0f]">
        <div className="container">
          <div className="mb-10">
            <p className="rk-section-label mb-3">Core Service</p>
            <h2 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
              ACRYLIC RENDER<br /><span className="rk-gold">&amp; TEXTURE COATINGS.</span>
            </h2>
            <div className="rk-divider mb-6" />
            <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
              This is what we do. Acrylic render and texture coatings on residential and low-rise construction across Queensland. Dulux Acratex accredited. Volume estates to custom builds. Consistent finish, every lot, every time.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="rk-section-label mb-3">What We Apply</p>
              <h3 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.6rem", letterSpacing: "0.03em" }}>
                ALL SUBSTRATES.<br /><span className="rk-gold">ALL SYSTEMS.</span>
              </h3>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                We apply acrylic render and texture coatings to every substrate used in Queensland residential construction. Brick veneer, concrete block, Hebel, EPS, Blueboard — we have done them all, thousands of times. Our Dulux Acratex accreditation means manufacturer-backed warranties on every job.
              </p>
              <p className="rk-section-label mb-4">Substrates We Work On</p>
              <div className="grid grid-cols-2 gap-2 mb-10">
                {acrylicSubstrates.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={14} className="rk-gold shrink-0" />
                    <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{s}</span>
                  </div>
                ))}
              </div>
              <p className="rk-section-label mb-4">Systems We Apply</p>
              <div className="space-y-4">
                {acrylicSystems.map((s, i) => (
                  <div key={i} className="rk-card">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2" style={{ letterSpacing: "0.08em" }}>{s.name}</h4>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${TEXTURE_IMG})` }} />
              <div className="rk-card">
                <p className="rk-section-label mb-2">Dulux Acratex Accredited Applicator</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>Manufacturer-approved systems with full product warranties. Your builder and homeowner get peace of mind. Your site manager gets consistency.</p>
              </div>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                We run multiple crews simultaneously across Greater Brisbane. 4–5 jobs per week is our standard operating pace. If you are a volume builder running an estate program, we have the capacity, the systems, and the track record to keep up with your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/5" />

      {/* ── SERVICE 2: HEBEL ── */}
      <section id="hebel" className="py-20 bg-[#111]">
        <div className="container">
          <div className="mb-10">
            <p className="rk-section-label mb-3">Wall Systems — Add-On Service</p>
            <h2 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
              HEBEL SUPPLY<br /><span className="rk-gold">&amp; INSTALLATION.</span>
            </h2>
            <div className="rk-divider mb-6" />
            <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
              CSR Hebel PowerPanelXL supply and installation for residential and low-rise construction. One subcontractor for your entire external wall system — from panel install to finished render.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="rk-section-label mb-3">Why Hebel?</p>
              <h3 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.6rem", letterSpacing: "0.03em" }}>
                ONE SUBCONTRACTOR.<br /><span className="rk-gold">WALL TO FINISH.</span>
              </h3>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Hebel AAC (Autoclaved Aerated Concrete) panels are the preferred external wall system for volume residential builders across Queensland. Lightweight, fast to install, and ready to render — they reduce your program time and eliminate the coordination between wall installer and renderer. We do both.
              </p>
              <div className="space-y-3 mb-8">
                {hebelBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={15} className="rk-gold shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div className="rk-card border-l-2 border-[#c9a84c]">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>Important Note</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  Our Hebel installation service is for residential and low-rise construction only. We do not undertake commercial or multi-storey Hebel installation.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${HEBEL_IMG})` }} />
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/5" />

      {/* ── SERVICE 3: EPS CLADDING ── */}
      <section id="eps-cladding" className="py-20 bg-[#0f0f0f]">
        <div className="container">
          <div className="mb-10">
            <p className="rk-section-label mb-3">Cladding Systems</p>
            <h2 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
              EPS CLADDING<br /><span className="rk-gold">SYSTEMS.</span>
            </h2>
            <div className="rk-divider mb-6" />
            <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
              Full EPS cladding system supply and installation. Lightweight, insulating, cost-effective. Residential and low-rise only.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <p className="rk-section-label mb-3">Lightweight. Insulating. Cost-Effective.</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>EPS (Expanded Polystyrene) cladding systems offer an excellent combination of insulation, lightweight construction, and cost-effectiveness. Render King supplies and installs the complete system — EPS panels, mesh, render coat, and finished acrylic render.</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>This is a residential and low-rise only service. We do not install EPS cladding on commercial high-rise projects.</p>
              </div>
              <div>
                <p className="rk-section-label mb-4">System Components</p>
                <div className="grid grid-cols-2 gap-3">
                  {epsComponents.map((t) => (
                    <div key={t} className="rk-card py-3 px-4"><p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{t}</p></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="rk-section-label mb-4">Benefits</p>
                <div className="grid grid-cols-1 gap-3">
                  {epsBenefits.map((item) => (
                    <div key={item.t} className="rk-card py-3">
                      <p className="text-white font-bold text-sm mb-1">{item.t}</p>
                      <p className="text-white/50 text-xs" style={{ fontWeight: 300 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rk-card border-l-[#c9a84c]">
                <p className="rk-section-label mb-2">Important Note</p>
                <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>Render King's EPS cladding service is for <strong className="text-white">residential and low-rise construction only</strong>.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${TEXTURE_IMG})` }} />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/5" />

      {/* ── SERVICE 4: SPECIALTY FINISHES ── */}
      <section id="specialty-finishes" className="py-20 bg-[#111]">
        <div className="container">
          <div className="mb-10">
            <p className="rk-section-label mb-3">Premium Finishes</p>
            <h2 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
              SPECIALTY<br /><span className="rk-gold">FINISHES.</span>
            </h2>
            <div className="rk-divider mb-6" />
            <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
              The premium end of our range — Dulux Acratex premium systems, combined render and paint packages, and external microcement on facades, pools, and outdoor areas.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <p className="rk-section-label mb-4">Services Included</p>
                <div className="grid grid-cols-1 gap-3">
                  {specialtyServices.map((item) => (
                    <div key={item.t} className="rk-card py-4">
                      <p className="text-white font-bold text-sm mb-2">{item.t}</p>
                      <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rk-card border-l-[#c9a84c]">
                <p className="rk-section-label mb-2">Internal Polished Surfaces?</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  For external microcement on facades, pools, and outdoor areas — our Render King team delivers. For internal polished walls, floors, and bespoke surfaces, visit our sister brand{" "}
                  <strong className="text-white">Micro Cement King</strong>. Same ownership. Same standard. Different speciality.
                </p>
                <a href="https://microcementking.com.au" target="_blank" rel="noopener noreferrer" className="rk-gold text-xs font-bold uppercase tracking-wider mt-3 inline-block hover:underline" style={{ letterSpacing: "0.1em" }}>
                  Visit Micro Cement King →
                </a>
              </div>
              <div>
                <p className="rk-section-label mb-4">Sunset Cove — Our Record Project</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>Australia's most ambitious 100% microcement home. Six suites. Featured on Channel 9. This project showcases the pinnacle of what our combined Render King and Micro Cement King teams can deliver.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${SUNSET_IMG})` }} />
              <div className="rk-card">
                <p className="rk-section-label mb-3">Featured Project</p>
                <p className="text-white font-bold text-sm mb-1">Sunset Cove, Robina</p>
                <p className="text-white/50 text-xs" style={{ fontWeight: 300 }}>$1.2M+ microcement. Channel 9 featured.</p>
              </div>
              <Link href="/portfolio" className="rk-btn-outline w-full text-center block">View Portfolio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f0f0f] border-t border-white/5">
        <div className="container text-center">
          <p className="rk-section-label mb-4">Ready to Get Started?</p>
          <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}>
            SUBMIT YOUR PROJECT.<br /><span className="rk-gold">WE'LL TURN IT AROUND FAST.</span>
          </h2>
          <div className="rk-divider mb-8 mx-auto" style={{ maxWidth: "80px" }} />
          <Link href="/submit-project" className="rk-btn-gold text-sm">
            Submit Your Project <ArrowRight size={14} className="inline ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
