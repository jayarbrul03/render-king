import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Shield, FileText, Users, AlertTriangle, CheckCircle, HardHat } from "lucide-react";

export default function Safety() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <section className="pt-32 pb-16 bg-[#0a0a0a] border-b border-white/8">
        <div className="container" style={{ paddingTop: '70px' }}>
          <p className="rk-section-label mb-3">Safety & Compliance</p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em" }}>
            SAFETY IS NOT<br /><span className="rk-gold">OPTIONAL.</span>
          </h1>
          <div className="rk-divider mt-4" />
          <p className="text-white/50 text-sm mt-6 max-w-2xl leading-relaxed" style={{ fontWeight: 300 }}>
            Render King operates a safety-first culture across every site, every crew, every day. Our safety systems are built into how we operate — not bolted on as an afterthought.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* PSRA */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={20} className="rk-gold" />
                  <p className="rk-section-label">Pre-Start Risk Assessments (PSRA)</p>
                </div>
                <h2 className="text-white font-black uppercase text-xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>PSRA ON EVERY SITE.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                  Before work commences on any project, Render King crews complete a Pre-Start Risk Assessment (PSRA). This is a mandatory, documented process that identifies site-specific hazards, controls, and responsibilities before a single tool is picked up.
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                  PSRAs cover: site access and egress, fall hazards, overhead services, scaffold and elevated work platform requirements, chemical handling (render products), personal protective equipment requirements, and emergency procedures.
                </p>
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {[
                    "Site hazard identification and risk rating",
                    "Fall prevention and scaffold compliance",
                    "Chemical handling — render and coating products",
                    "PPE requirements per task and substrate",
                    "Emergency procedures and first aid access",
                    "Site-specific access and egress controls",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 py-2 border-b border-white/6">
                      <CheckCircle size={14} className="rk-gold mt-0.5 shrink-0" />
                      <p className="text-white/60 text-sm" style={{ fontWeight: 300 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Compliance */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={20} className="rk-gold" />
                  <p className="rk-section-label">Safety Compliance Framework</p>
                </div>
                <h2 className="text-white font-black uppercase text-xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>COMPLIANT. DOCUMENTED. ENFORCED.</h2>
                <div className="rk-divider mb-6" />
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: <HardHat size={16} className="rk-gold" />, title: "Work Health & Safety Act Compliance", desc: "All operations comply with the Work Health and Safety Act 2011 (QLD) and relevant codes of practice." },
                    { icon: <FileText size={16} className="rk-gold" />, title: "Safe Work Method Statements (SWMS)", desc: "SWMS are prepared for all high-risk construction work including work at heights, scaffold, and chemical handling." },
                    { icon: <AlertTriangle size={16} className="rk-gold" />, title: "Incident Reporting & Investigation", desc: "All incidents and near-misses are reported, investigated, and corrective actions implemented within 24 hours." },
                    { icon: <Shield size={16} className="rk-gold" />, title: "QBCC Licensing", desc: "Render King holds current QBCC contractor licences for all relevant work categories." },
                  ].map((item) => (
                    <div key={item.title} className="rk-card">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <div>
                          <p className="text-white font-bold text-sm mb-2">{item.title}</p>
                          <p className="text-white/50 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Training */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users size={20} className="rk-gold" />
                  <p className="rk-section-label">Staff Training & Induction</p>
                </div>
                <h2 className="text-white font-black uppercase text-xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>EVERY CREW MEMBER. TRAINED.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                  Every Render King crew member completes a structured induction before commencing work. This covers company safety policies, site-specific requirements, product handling procedures, and emergency protocols.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Site induction — every new site",
                    "White Card (Construction Induction)",
                    "Working at Heights training",
                    "Chemical handling & SDS awareness",
                    "Scaffold user training",
                    "First aid — crew leads",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle size={12} className="rk-gold mt-0.5 shrink-0" />
                      <p className="text-white/60 text-xs" style={{ fontWeight: 300 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Communication */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle size={20} className="rk-gold" />
                  <p className="rk-section-label">Customer & Builder Communication</p>
                </div>
                <h2 className="text-white font-black uppercase text-xl mb-4" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.04em" }}>CLEAR. DOCUMENTED. PROACTIVE.</h2>
                <div className="rk-divider mb-6" />
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                  Builders and site managers receive clear communication on safety requirements before and during every project. This includes pre-start safety briefings, site access protocols, and any specific requirements for the project.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { t: "Pre-Start Briefing", d: "Safety requirements communicated to site managers before work commences." },
                    { t: "Site Access Protocols", d: "Clear documentation of access requirements, exclusion zones, and working hours." },
                    { t: "Product Safety Data Sheets", d: "SDS for all render and coating products available on request." },
                    { t: "Insurance Documentation", d: "Public liability insurance certificates provided on request." },
                  ].map((item) => (
                    <div key={item.t} className="flex items-start gap-3 py-2 border-b border-white/6">
                      <CheckCircle size={14} className="rk-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">{item.t}</p>
                        <p className="text-white/50 text-xs mt-0.5" style={{ fontWeight: 300 }}>{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rk-card">
                <p className="rk-section-label mb-4">Compliance Summary</p>
                <ul className="space-y-3 text-sm" style={{ fontWeight: 300 }}>
                  {[
                    "PSRA — every site, every day",
                    "SWMS — all high-risk work",
                    "QBCC Licensed",
                    "Public Liability Insured",
                    "White Card — all crew",
                    "WHS Act 2011 compliant",
                    "Dulux Acratex accredited",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/60">
                      <CheckCircle size={12} className="rk-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rk-card">
                <p className="rk-section-label mb-3">Request Safety Docs</p>
                <p className="text-white/50 text-xs leading-relaxed mb-4" style={{ fontWeight: 300 }}>Need our SWMS, insurance certificates, or PSRA templates? Contact us directly.</p>
                <Link href="/contact" className="rk-btn-outline w-full text-center block text-xs">Contact Us</Link>
              </div>
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">Submit a Project</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
