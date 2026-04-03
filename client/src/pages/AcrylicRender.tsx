import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-estate-JUgBRcX8MbyqQxbsp2dh3F.webp";
const TEXTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-texture-dYRg9c2L9YQeJmNNKeihRX.webp";
const CREW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-crew-85TRdReUj7gJdkTizPmksY.webp";
const LOWSET = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-lowset-JwsWjD7Y8SXnHtdHRnyyKq.webp";

const substrates = ["Brick Veneer","Concrete Block","Hebel / AAC","EPS Cladding","Blueboard / FC Sheet","Rendered over existing","Mixed substrate facades"];
const systems = [
  { name: "Dulux Acratex Texture Coat", desc: "Fine sand, medium sand, and rough cast. The industry standard for volume residential. Colour-matched lot to lot." },
  { name: "Dulux Acratex Premium Systems", desc: "High-build, self-priming systems for superior coverage and durability. Ideal for complex facades and premium builds." },
  { name: "Rockcote Systems", desc: "Full Rockcote render and texture coat systems for custom and architectural builds." },
  { name: "Cement Render Base Coat", desc: "Traditional sand and cement base coat for all substrates. Solid foundation for any finish system." },
];

export default function AcrylicRender() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" />
        <div className="relative container" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-3">Core Service</p>
          <h1 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            ACRYLIC RENDER<br /><span className="rk-gold">&amp; TEXTURE COATINGS.</span>
          </h1>
          <div className="rk-divider mb-6" />
          <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
            This is what we do. Acrylic render and texture coatings on residential and low-rise construction across Queensland. Dulux Acratex accredited. Volume estates to custom builds. Consistent finish, every lot, every time.
          </p>
        </div>
      </section>
      <section className="py-16 bg-[#0f0f0f]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="rk-section-label mb-3">What We Apply</p>
              <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em" }}>
                ALL SUBSTRATES.<br /><span className="rk-gold">ALL SYSTEMS.</span>
              </h2>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                We apply acrylic render and texture coatings to every substrate used in Queensland residential construction. Brick veneer, concrete block, Hebel, EPS, Blueboard — we have done them all, thousands of times. Our Dulux Acratex accreditation means manufacturer-backed warranties on every job.
              </p>
              <p className="rk-section-label mb-4">Substrates We Work On</p>
              <div className="grid grid-cols-2 gap-2 mb-10">
                {substrates.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={14} className="rk-gold shrink-0" />
                    <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{s}</span>
                  </div>
                ))}
              </div>
              <p className="rk-section-label mb-4">Systems We Apply</p>
              <div className="space-y-4">
                {systems.map((s, i) => (
                  <div key={i} className="rk-card">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2" style={{ letterSpacing: "0.08em" }}>{s.name}</h4>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${TEXTURE})` }} />
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${CREW})` }} />
              <div className="rk-card">
                <p className="rk-section-label mb-2">Dulux Acratex Accredited Applicator</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>Manufacturer-approved systems with full product warranties. Your builder and homeowner get peace of mind. Your site manager gets consistency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${LOWSET})` }} />
            <div>
              <p className="rk-section-label mb-3">Volume Capability</p>
              <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em" }}>
                BUILT FOR<br /><span className="rk-gold">ESTATE VOLUME.</span>
              </h2>
              <div className="rk-divider mb-6" />
              <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                We run multiple crews simultaneously across Greater Brisbane. 4–5 jobs per week is our standard operating pace. 24 years. If you are a volume builder running an estate program, we have the capacity, the systems, and the track record to keep up with your schedule.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Ausbuild, Metricon, Gem Life, Stylemaster, Parade Homes — they trust us because we do not create problems. We solve them.
              </p>
              <Link href="/submit-project" className="rk-btn-gold">
                Submit Your Project <ArrowRight size={14} className="inline ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
