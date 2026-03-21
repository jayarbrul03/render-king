import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-render-5VYncEsA98vpANaUphE9kL.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-sunset-cove-Zkx6WQV6sk5aHsnhX6jeYM.webp";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp";

const categories = ["All", "Acrylic Render", "Hebel Systems", "EPS Cladding", "Specialty & External Microcement"];

const projects = [
  { title: "Sunset Cove", suburb: "Robina, Gold Coast", category: "Specialty & External Microcement", img: SUNSET_IMG, tag: "Record Project", desc: "Australia's most ambitious 100% microcement home. $1.2M+. 10,000+ hours. Channel 9 featured." },
  { title: "Volume Estate — Coomera", suburb: "Coomera, Gold Coast", category: "Acrylic Render", img: HERO_IMG, tag: "Volume Builder", desc: "Full acrylic render across 45 homes. Dulux Acratex sand finish. Delivered for Ausbuild." },
  { title: "Hebel Installation — Springfield", suburb: "Springfield, Brisbane", category: "Hebel Systems", img: HEBEL_IMG, tag: "Hebel Supply & Install", desc: "CSR Hebel PowerPanelXL supply and installation across a 12-home estate." },
  { title: "EPS Cladding — Morayfield", suburb: "Morayfield, Brisbane", category: "EPS Cladding", img: TEXTURE_IMG, tag: "EPS System", desc: "Full EPS cladding system installation. 18 homes. Render finish included." },
  { title: "Premium Render — Kenmore", suburb: "Kenmore, Brisbane", category: "Acrylic Render", img: HERO_IMG, tag: "Custom Residential", desc: "Dulux Acratex premium system on architect-designed custom home." },
  { title: "External Microcement — Broadbeach", suburb: "Broadbeach, Gold Coast", category: "Specialty & External Microcement", img: SUNSET_IMG, tag: "External Microcement", desc: "External microcement on pool surround and facade. Render King team delivery." },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="pt-32 pb-16 bg-[#0a0a0a] border-b border-white/8">
        <div className="container">
          <p className="rk-section-label mb-3">Our Work</p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            10,000+ PROJECTS.<br /><span className="rk-gold">PROOF IN EVERY FINISH.</span>
          </h1>
          <div className="rk-divider mt-4" />
        </div>
      </section>

      {/* Sunset Cove Feature */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SUNSET_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-transparent" />
        <div className="relative container py-20">
          <div className="max-w-xl">
            <span className="inline-block bg-[#c9a84c] text-[#0f0f0f] text-xs font-black uppercase tracking-widest px-3 py-1 mb-4" style={{ letterSpacing: "0.15em" }}>Record-Breaking Project</span>
            <h2 className="text-white font-black uppercase mb-2" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.03em" }}>SUNSET COVE</h2>
            <p className="rk-gold font-bold text-sm uppercase tracking-wider mb-4" style={{ letterSpacing: "0.1em" }}>Robina, Gold Coast</p>
            <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>Australia's most ambitious 100% microcement home. Six suites. Resort-grade living. Over 10,000 hours of artistry. $1.2M+ in microcement alone. Featured on Channel 9. Sold at auction.</p>
            <div className="flex gap-6 mb-6">
              {[{ n: "10,000+", l: "Hours" }, { n: "$1.2M+", l: "Value" }, { n: "100%", l: "Microcement" }].map((s) => (
                <div key={s.l} className="border-l-2 border-[#c9a84c] pl-3">
                  <div className="rk-gold font-black text-xl rk-heading">{s.n}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${active === c ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]" : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"}`}
                style={{ letterSpacing: "0.1em" }}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
            {filtered.map((p, i) => (
              <div key={i} className="group bg-[#0f0f0f] overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${p.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#c9a84c] text-[#0f0f0f] text-xs font-black uppercase tracking-widest px-2 py-1" style={{ letterSpacing: "0.12em" }}>{p.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-black uppercase text-lg mb-1" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>{p.title}</h3>
                  <p className="rk-gold text-xs font-semibold uppercase tracking-wider mb-3" style={{ letterSpacing: "0.1em" }}>{p.suburb}</p>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#111] border-t border-white/8">
        <div className="container text-center">
          <p className="rk-section-label mb-4">Ready to Add Your Project?</p>
          <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "0.03em" }}>SUBMIT YOUR PROJECT TODAY.</h2>
          <Link href="/submit-project" className="rk-btn-gold">Submit a Project</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
