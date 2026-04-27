import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const HEBEL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-hebel-KhTNFiwZQmtUKssEyHWrkm.webp";
const ESTATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-estate-JUgBRcX8MbyqQxbsp2dh3F.webp";

const benefits = [
  "Termite resistant — no chemical treatment required",
  "Fire rated — BAL-rated for bushfire zones",
  "Lightweight — faster install, less structural load",
  "Excellent thermal and acoustic performance",
  "Ready to render — no waiting, no prep delays",
  "Residential and low-rise only",
];

export default function HebelInstall() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${HEBEL})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" />
        <div className="relative container" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-3">Wall Systems — Add-On Service</p>
          <h1 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            HEBEL SUPPLY<br /><span className="rk-gold">&amp; INSTALLATION.</span>
          </h1>
          <div className="rk-divider mb-6" />
          <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
            CSR Hebel PowerPanelXL supply and installation for residential and low-rise construction. One subcontractor for your entire external wall system — from panel install to finished render. Residential and low-rise only.
          </p>
        </div>
      </section>
      <section className="py-16 bg-[#0f0f0f]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="rk-section-label mb-3">Why Hebel?</p>
              <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em" }}>
                ONE SUBCONTRACTOR.<br /><span className="rk-gold">WALL TO FINISH.</span>
              </h2>
              <div className="rk-divider mb-8" />
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Hebel AAC (Autoclaved Aerated Concrete) panels are the preferred external wall system for volume residential builders across Queensland. Lightweight, fast to install, and ready to render — they reduce your program time and eliminate the coordination between wall installer and renderer. We do both.
              </p>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={15} className="rk-gold shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm" style={{ fontWeight: 300 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 rk-card border-l-2 border-[#c9a84c]">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>Important Note</p>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  Our Hebel installation service is for residential and low-rise construction only. We do not undertake commercial or multi-storey Hebel installation.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${HEBEL})` }} />
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${ESTATE})` }} />
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
