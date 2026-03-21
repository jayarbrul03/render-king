import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp";
export default function HebelInstall() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HEBEL_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative container pb-12">
          <p className="rk-section-label mb-3">Services</p>
          <h1 className="text-white font-black uppercase" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            HEBEL SUPPLY<br /><span className="rk-gold">& INSTALL</span>
          </h1>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="rk-section-label mb-3">CSR Hebel PowerPanelXL — Residential & Low-Rise Only</p>
                <h2 className="text-white font-black uppercase text-2xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>HIGH-MARGIN. LOW COMPETITION.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>Hebel AAC (Autoclaved Aerated Concrete) panels are the premium substrate choice for residential construction. Render King supplies and installs CSR Hebel PowerPanelXL — providing builders with a complete wall system from substrate to finished render.</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>This is a residential and low-rise only service. We do not install Hebel on commercial high-rise projects.</p>
              </div>
              <div>
                <p className="rk-section-label mb-4">Why Builders Choose Hebel</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { t: "Termite Resistant", d: "Inorganic material — no food source for termites." },
                    { t: "Fire Rated", d: "Hebel panels achieve high fire resistance ratings." },
                    { t: "Fast Installation", d: "Large panel format reduces install time significantly." },
                    { t: "Superior Render Substrate", d: "Consistent, flat surface for premium render finish." },
                    { t: "Thermal Performance", d: "Excellent insulation properties reduce energy costs." },
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
                <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>Render King's Hebel installation service is for <strong className="text-white">residential and low-rise construction only</strong>. We do not install Hebel on commercial high-rise or multi-storey commercial projects.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rk-card">
                <p className="rk-section-label mb-3">Pricing Guide</p>
                <div className="rk-gold font-black text-3xl rk-heading">$110–$165</div>
                <p className="text-white/50 text-xs mt-1" style={{ fontWeight: 300 }}>Per m² — full supply & install system</p>
                <p className="text-white/30 text-xs mt-2" style={{ fontWeight: 300 }}>Contact us for project-specific pricing</p>
              </div>
              <div className="rk-card">
                <p className="rk-section-label mb-3">Partnership</p>
                <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>CSR Hebel authorised installer. Manufacturer-backed product warranty.</p>
              </div>
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">Request Hebel Quote</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
