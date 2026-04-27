import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Link } from "wouter";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-sunset-cove-Zkx6WQV6sk5aHsnhX6jeYM.webp";
export default function SpecialtyFinishes() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${SUNSET_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" />
        <div className="relative container" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-3">Services</p>
          <h1 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            SPECIALTY<br /><span className="rk-gold">FINISHES</span>
          </h1>
          <div className="rk-divider mb-6" />
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="rk-section-label mb-3">Premium External Finishes</p>
                <h2 className="text-white font-black uppercase text-2xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>THE PREMIUM END OF OUR RANGE.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>Render King's specialty finishes service covers the premium end of our range — Dulux Acratex premium systems, combined render and paint packages, and external microcement applications on facades, pools, and outdoor areas.</p>
              </div>
              <div>
                <p className="rk-section-label mb-4">Services Included</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { t: "Dulux Acratex Premium Systems", d: "Top-tier Acratex product range for premium residential and architectural projects." },
                    { t: "Combined Render & Paint Packages", d: "Full exterior package — render, prime, and paint in one contract." },
                    { t: "External Microcement", d: "Microcement on facades, pool surrounds, and outdoor feature walls. Delivered by our Render King team." },
                  ].map((item) => (
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
                <a href="https://microcement.king" target="_blank" rel="noopener noreferrer" className="rk-gold text-xs font-bold uppercase tracking-wider mt-3 inline-block hover:underline" style={{ letterSpacing: "0.1em" }}>
                  Visit Micro Cement King →
                </a>
              </div>
              <div>
                <p className="rk-section-label mb-4">Sunset Cove — Our Record Project</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>Australia's most ambitious 100% microcement home. Six suites. Over 10,000 hours. $1.2M+ in microcement alone. Featured on Channel 9. This project showcases the pinnacle of what our combined Render King and Micro Cement King teams can deliver.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rk-card">
                <p className="rk-section-label mb-3">Featured Project</p>
                <p className="text-white font-bold text-sm mb-1">Sunset Cove, Robina</p>
                <p className="text-white/50 text-xs" style={{ fontWeight: 300 }}>$1.2M+ microcement. 10,000+ hours. Channel 9 featured.</p>
              </div>
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">Request a Quote</Link>
              <Link href="/portfolio" className="rk-btn-outline w-full text-center block">View Portfolio</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
