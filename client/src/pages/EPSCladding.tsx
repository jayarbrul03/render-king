import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-render-5VYncEsA98vpANaUphE9kL.webp";
export default function EPSCladding() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" />
        <div className="relative container" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-3">Services</p>
          <h1 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            EPS CLADDING<br /><span className="rk-gold">SYSTEMS</span>
          </h1>
          <div className="rk-divider mb-6" />
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="rk-section-label mb-3">Full EPS System Supply & Installation — Residential & Low-Rise Only</p>
                <h2 className="text-white font-black uppercase text-2xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>LIGHTWEIGHT. INSULATING. COST-EFFECTIVE.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>EPS (Expanded Polystyrene) cladding systems offer an excellent combination of insulation, lightweight construction, and cost-effectiveness. Render King supplies and installs the complete system — EPS panels, mesh, render coat, and finished acrylic render.</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>This is a residential and low-rise only service. We do not install EPS cladding on commercial high-rise projects.</p>
              </div>
              <div>
                <p className="rk-section-label mb-4">System Components</p>
                <div className="grid grid-cols-2 gap-3">
                  {["EPS Panels", "Fibreglass Mesh", "Base Coat", "Acrylic Render Finish", "Corner Beads & Trims", "Fixings & Adhesive"].map((t) => (
                    <div key={t} className="rk-card py-3 px-4"><p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{t}</p></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="rk-section-label mb-4">Benefits</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { t: "Lightweight", d: "Reduces structural load compared to masonry systems." },
                    { t: "Thermal Insulation", d: "Significantly improves building energy efficiency." },
                    { t: "Cost-Effective", d: "Lower material and labour cost than Hebel for many applications." },
                    { t: "Design Flexibility", d: "Can achieve complex profiles, reveals, and architectural details." },
                  ].map((item) => (
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
              <div className="rk-card">
                <p className="rk-section-label mb-3">Pricing Guide</p>
                <div className="rk-gold font-black text-3xl rk-heading">$75–$110</div>
                <p className="text-white/50 text-xs mt-1" style={{ fontWeight: 300 }}>Per m² — full supply & install system</p>
                <p className="text-white/30 text-xs mt-2" style={{ fontWeight: 300 }}>Contact us for project-specific pricing</p>
              </div>
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">Request EPS Quote</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
