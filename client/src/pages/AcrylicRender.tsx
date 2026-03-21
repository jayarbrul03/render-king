import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp";
export default function AcrylicRender() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${TEXTURE_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative container pb-12">
          <p className="rk-section-label mb-3">Services</p>
          <h1 className="text-white font-black uppercase" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            ACRYLIC RENDER
          </h1>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="rk-section-label mb-3">Queensland's #1 Acrylic Render Applicator</p>
                <h2 className="text-white font-black uppercase text-2xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>THE CORE SERVICE.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>Acrylic render is the backbone of Render King's operation. We apply Dulux Acratex systems across all substrates — brick, block, Hebel AAC, EPS, and Blueboard — delivering a consistent, durable finish that volume builders and homeowners trust.</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>With 10,000+ projects completed across Greater Brisbane, Morayfield, Ipswich, and the Gold Coast, we have the scale, systems, and experience to deliver on time, every time.</p>
              </div>
              <div>
                <p className="rk-section-label mb-4">Texture Options</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Smooth", "Sand Finish", "Coarse", "Custom Texture", "Dulux Acratex Premium", "Fine Texture"].map((t) => (
                    <div key={t} className="rk-card py-3 px-4"><p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{t}</p></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="rk-section-label mb-4">Substrates We Work On</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Brick", "Concrete Block", "Hebel AAC", "EPS Cladding", "Blueboard", "Fibre Cement"].map((t) => (
                    <div key={t} className="rk-card py-3 px-4"><p className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{t}</p></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="rk-section-label mb-4">Geographic Coverage</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>Greater Brisbane (primary volume area), Morayfield to Ipswich, Gold Coast, and expanding across Queensland. New site managers are being placed to continue our growth.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rk-card">
                <p className="rk-section-label mb-3">Accreditations</p>
                <ul className="space-y-2 text-white/60 text-sm" style={{ fontWeight: 300 }}>
                  <li>✓ Dulux Acratex Accredited Applicator</li>
                  <li>✓ QBCC Licensed</li>
                  <li>✓ Public Liability Insured</li>
                  <li>✓ PSRA Safety Compliant</li>
                </ul>
              </div>
              <div className="rk-card">
                <p className="rk-section-label mb-3">Projects Completed</p>
                <div className="rk-gold font-black text-4xl rk-heading">10,000+</div>
                <p className="text-white/50 text-xs mt-1" style={{ fontWeight: 300 }}>Across Queensland</p>
              </div>
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
