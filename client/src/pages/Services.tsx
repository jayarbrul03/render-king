/*
 * RENDER KING — Services Overview Page
 */
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hero-render-5VYncEsA98vpANaUphE9kL.webp";
const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-texture-closeup-eQprUxXpifLWpM4DRV7KGH.webp";
const HEBEL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-hebel-install-8S8VgMjohyoBG6cZdFModu.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-sunset-cove-Zkx6WQV6sk5aHsnhX6jeYM.webp";

const services = [
  { title: "Acrylic Render", subtitle: "Queensland's #1 Acrylic Render Applicator", desc: "All substrates. All textures. Dulux Acratex accredited. 10,000+ projects across Greater Brisbane and Queensland.", href: "/services/acrylic-render", img: TEXTURE_IMG, tag: "Core Service" },
  { title: "Hebel Supply & Install", subtitle: "CSR Hebel PowerPanelXL — Residential & Low-Rise", desc: "Supply and installation of Hebel AAC panels. Termite resistant, fire rated, fast install. Residential and low-rise only.", href: "/services/hebel-installation", img: HEBEL_IMG, tag: "High Margin" },
  { title: "EPS Cladding Systems", subtitle: "Full EPS System Supply & Installation", desc: "Lightweight, insulating, cost-effective EPS cladding systems. Full supply and install package. Residential and low-rise only.", href: "/services/eps-cladding", img: HERO_IMG, tag: "Full System" },
  { title: "Specialty Finishes", subtitle: "Premium External Finishes & Microcement", desc: "Dulux Acratex premium systems, combined render and paint packages, and external microcement applications. The premium end of our range.", href: "/services/specialty-finishes", img: SUNSET_IMG, tag: "Premium" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="pt-32 pb-16 bg-[#0a0a0a] border-b border-white/8">
        <div className="container">
          <p className="rk-section-label mb-3">What We Do</p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            COMPLETE WALL SYSTEMS.<br /><span className="rk-gold">ONE CREW.</span>
          </h1>
          <div className="rk-divider mt-4" />
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <div className="space-y-px bg-white/6">
            {services.map((s, i) => (
              <Link key={i} href={s.href} className="group flex flex-col md:flex-row bg-[#0f0f0f] hover:bg-[#141414] transition-colors overflow-hidden block">
                <div className="md:w-80 h-56 md:h-auto bg-cover bg-center shrink-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="rk-section-label">{s.tag}</span>
                    </div>
                    <h2 className="text-white font-black uppercase text-2xl mb-2" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>{s.title}</h2>
                    <p className="rk-gold text-xs font-semibold uppercase tracking-wider mb-4" style={{ letterSpacing: "0.1em" }}>{s.subtitle}</p>
                    <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{s.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 rk-gold text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all" style={{ letterSpacing: "0.12em" }}>
                    Learn More <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#111] border-t border-white/8">
        <div className="container text-center">
          <p className="rk-section-label mb-4">Ready to Get Started?</p>
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
