import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const CREW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-crew-85TRdReUj7gJdkTizPmksY.webp";
const ESTATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-estate-JUgBRcX8MbyqQxbsp2dh3F.webp";
const LUXURY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/rk-v2-luxury-eRmKZ4GLPaQDzSEB5SasEF.webp";

const milestones = [
  { year: "2001", event: "Matty Mannion starts in the trade. First render job in South East Queensland." },
  { year: "2005", event: "Building a reputation on volume estates. Two jobs a week becomes the baseline." },
  { year: "2012", event: "Multiple crews running simultaneously. Render King becomes a recognised name with volume builders." },
  { year: "2016", event: "Ausbuild, Metricon, Gem Life, Stylemaster, Parade Homes — all trusted clients." },
  { year: "2020", event: "Expanding into Hebel and EPS wall systems. One subcontractor for the full wall system." },
  { year: "2024", event: "10,000+ combined projects. 100,000+ combined hours. Queensland's largest rendering operation." },
  { year: "2025+", event: "New managers placed. Expanding coverage across all of Queensland." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${CREW})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 to-[#0f0f0f]" />
        <div className="relative container" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-3">About Render King</p>
          <h1 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.02em", lineHeight: 0.95 }}>
            BUILT FROM<br /><span className="rk-gold">THE GROUND UP.</span>
          </h1>
          <div className="rk-divider mb-6" />
          <p className="text-white/60 text-base max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
            24 years. 10,000+ projects. One of Queensland's largest rendering operations. This is not a marketing claim — it is a track record built one job at a time.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f0f]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="rk-section-label mb-3">The Story</p>
              <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em" }}>
                STARTED ON THE TOOLS.<br /><span className="rk-gold">BUILT A SYSTEM.</span>
              </h2>
              <div className="rk-divider mb-8" />
              <div className="space-y-5 text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                <p>
                  Matty Mannion started in the trade and built one of Queensland's largest rendering operations from the ground up. Not from a boardroom — from the scaffolding. Two render jobs a week personally for 20 years. That is over 2,000 jobs by one person before you count a single crew member.
                </p>
                <p>
                  With multiple crews running 4–5 jobs per week for the past 8 years, Render King has crossed 10,000 combined projects and 100,000 combined hours delivered across Queensland.
                </p>
                <p>
                  The difference between Render King and every other renderer in Queensland is systems. Most renderers are one or two people. We are an operation — scheduled crews, quality control processes, direct communication, and a track record with Queensland's largest volume builders.
                </p>
                <p>
                  Render King operates under Render Render Pty Ltd, the parent company that also operates Micro Cement King, Sunny Days Developments, and Momentrix AI. The construction businesses are the foundation. The systems we've built are what make the difference.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${CREW})` }} />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "10,000+", l: "Combined Projects" },
                  { n: "24", l: "Years in the Trade" },
                  { n: "100,000+", l: "Combined Hours" },
                  { n: "4–5", l: "Jobs Per Week" },
                ].map((s, i) => (
                  <div key={i} className="rk-card text-center">
                    <div className="rk-gold font-black text-2xl rk-heading">{s.n}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mt-1" style={{ letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111]">
        <div className="container">
          <p className="rk-section-label mb-3">Timeline</p>
          <h2 className="text-white font-black uppercase mb-10" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em" }}>
            24 YEARS.<br /><span className="rk-gold">ONE JOB AT A TIME.</span>
          </h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#c9a84c] shrink-0 mt-1.5" />
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-white/10 my-1" />}
                </div>
                <div className="pb-8">
                  <p className="rk-gold font-black text-sm rk-heading mb-1">{m.year}</p>
                  <p className="text-white/60 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f0f]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="w-full aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${LUXURY})` }} />
            <div>
              <p className="rk-section-label mb-3">Our Coverage</p>
              <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em" }}>
                GREATER BRISBANE<br /><span className="rk-gold">IS HOME BASE.</span>
              </h2>
              <div className="rk-divider mb-6" />
              <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                Our primary focus is Greater Brisbane and the high-volume corridors — Morayfield, North Lakes, Caboolture, Ipswich, Springfield, Logan, and down to the Gold Coast. This is where the volume is, and this is where we operate best.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                We also travel for the right projects and are actively placing new managers to continue expanding our Queensland coverage. The goal is to be the default renderer for every volume builder in the state.
              </p>
              <Link href="/submit-project" className="rk-btn-gold">Submit Your Project</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
