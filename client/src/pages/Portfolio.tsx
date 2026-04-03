import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-hero-6jYCUF44EYhoRu8gvPANq9.webp";
const ESTATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-estate-JUgBRcX8MbyqQxbsp2dh3F.webp";
const CREW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-crew-85TRdReUj7gJdkTizPmksY.webp";
const TEXTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-texture-dYRg9c2L9YQeJmNNKeihRX.webp";
const LOWSET = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-lowset-JwsWjD7Y8SXnHtdHRnyyKq.webp";
const LUXURY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-luxury-eRmKZ4GLPaQDzSEB5SasEF.webp";
const HEBEL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-hebel-KhTNFiwZQmtUKssEyHWrkm.webp";

const projects = [
  { img: HERO, title: "Double Storey Estate", location: "Coomera, Gold Coast", type: "Acrylic Render — Volume Estate" },
  { img: ESTATE, title: "Volume Estate Stage", location: "North Brisbane", type: "Acrylic Render — Multiple Lots" },
  { img: LOWSET, title: "Low-Set Residential", location: "Springfield, Ipswich", type: "Acrylic Render — Brick Veneer" },
  { img: LUXURY, title: "Luxury Custom Build", location: "Gold Coast Hinterland", type: "Acrylic Render — Architectural" },
  { img: CREW, title: "Active Estate Build", location: "Greater Brisbane", type: "Render Crew — On Site" },
  { img: HEBEL, title: "Hebel External Install", location: "Ipswich Region", type: "Hebel Supply & Install" },
  { img: TEXTURE, title: "Texture Coat Closeup", location: "Brisbane Northside", type: "Dulux Acratex Texture Coat" },
  { img: HERO, title: "Estate Completion", location: "Morayfield", type: "Acrylic Render — Volume" },
  { img: ESTATE, title: "New Estate — Stage 2", location: "Logan", type: "Acrylic Render — Volume" },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${ESTATE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" style={{ paddingTop: '60px' }} />
        <div className="relative container" style={{ paddingTop: '60px' }}>
          <p className="rk-section-label mb-3">Our Work</p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            VOLUME ESTATES.<br /><span className="rk-gold">CUSTOM BUILDS. LOW-SET. HIGH-END.</span>
          </h1>
          <div className="rk-divider mb-6" />
          <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
            10,000+ projects across Queensland. From 4-lot stages to 200-lot estates. From low-set brick veneer to luxury architectural renders. We do both — and we do them at the same standard.
          </p>
        </div>
      </section>
      <section className="pb-24 bg-[#0f0f0f]">
        <div className="container" style={{ paddingTop: '60px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {projects.map((p, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#0f0f0f]" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${p.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent group-hover:via-[#0a0a0a]/30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="rk-section-label mb-1">{p.type}</p>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide" style={{ letterSpacing: "0.08em" }}>{p.title}</h3>
                  <p className="text-white/50 text-xs mt-1" style={{ fontWeight: 300 }}>{p.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-white/40 text-sm mb-6" style={{ fontWeight: 300 }}>These are representative project types. Upload your own project for a personalised quote.</p>
            <Link href="/submit-project" className="rk-btn-gold">Submit Your Project</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
