import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-render-5VYncEsA98vpANaUphE9kL.webp";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative h-80 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <div className="relative container pb-12">
          <p className="rk-section-label mb-3">Our Story</p>
          <h1 className="text-white font-black uppercase" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            ABOUT<br /><span className="rk-gold">RENDER KING</span>
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <p className="rk-section-label mb-3">Founded on the Tools</p>
                <h2 className="text-white font-black uppercase text-2xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>BUILT FROM THE GROUND UP.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>Matty Mannion started in the trade and built one of Queensland's largest rendering operations from the ground up. 24 years in the industry. Two render jobs a week for 20 years — that's over 2,000 jobs personally completed. With crews running 4–5 jobs a week over the past 8 years, Render King has crossed 10,000 projects combined.</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>The company was built on a simple philosophy: do the work properly, show up on time, and build systems that scale. That philosophy hasn't changed. What has changed is the scale of the operation — from a single operator to one of Queensland's largest rendering companies.</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>Today, Render King services Greater Brisbane as its primary volume market — from Morayfield to Ipswich — and extends down to the Gold Coast. New site managers are being placed to continue Queensland-wide expansion.</p>
              </div>
              <div>
                <p className="rk-section-label mb-4">The Render Render Pty Ltd Group</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>Render King operates under Render Render Pty Ltd — the parent company of the group. The portfolio includes:</p>
                <div className="space-y-3">
                  {[
                    { name: "Render King", desc: "Rendering and cladding systems — the core business." },
                    { name: "Micro Cement King", desc: "Premium decorative microcement for internal surfaces." },
                    { name: "Sunny Days Developments", desc: "Luxury residential property development." },
                    { name: "Momentrix AI", desc: "AI operating system for trade contractors." },
                  ].map((c) => (
                    <div key={c.name} className="rk-card py-3">
                      <p className="text-white font-bold text-sm mb-1">{c.name}</p>
                      <p className="text-white/50 text-xs" style={{ fontWeight: 300 }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative">
                <div className="w-full aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url(${HEBEL_IMG})` }} />
                <div className="absolute -bottom-4 -right-4 bg-[#c9a84c] p-6 hidden lg:block">
                  <div className="text-[#0f0f0f] font-black text-3xl rk-heading">24</div>
                  <div className="text-[#0f0f0f] text-xs font-bold uppercase tracking-wider">Years</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "10,000+", l: "Projects" },
                  { n: "100,000+", l: "Hours Delivered" },
                  { n: "24", l: "Years Experience" },
                  { n: "$1.2M+", l: "Single Project Record" },
                ].map((s) => (
                  <div key={s.l} className="rk-card text-center py-4">
                    <div className="rk-gold font-black text-2xl rk-heading">{s.n}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mt-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="rk-card">
                <p className="rk-section-label mb-3">Manufacturer Partnerships</p>
                <ul className="space-y-2 text-white/60 text-sm" style={{ fontWeight: 300 }}>
                  <li>✓ Dulux Acratex Accredited Applicator</li>
                  <li>✓ CSR Hebel Authorised Installer</li>
                  <li>✓ QBCC Licensed</li>
                  <li>✓ Public Liability Insured</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111] border-t border-white/8">
        <div className="container text-center">
          <p className="rk-section-label mb-4">Work With Us</p>
          <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}>
            SUBMIT YOUR PROJECT TODAY.
          </h2>
          <Link href="/submit-project" className="rk-btn-gold">Submit a Project</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
