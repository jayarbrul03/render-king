/*
 * RENDER KING — Footer Component
 * Dark Luxury Editorial: deep black, gold accents, Montserrat
 */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-white font-black uppercase tracking-widest text-xl leading-none" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em" }}>
                RENDER
              </div>
              <div className="rk-gold font-black uppercase tracking-widest text-xl leading-none" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em" }}>
                KING
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4" style={{ fontWeight: 300 }}>
              Queensland's premier rendering and cladding specialists. 24 years. 10,000+ projects. Built on quality.
            </p>
            <p className="text-white/30 text-xs uppercase tracking-wider" style={{ letterSpacing: "0.12em" }}>
              A Render Render Pty Ltd Company
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c9a84c] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c9a84c] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="rk-section-label mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Acrylic Render", href: "/services/acrylic-render" },
                { label: "Hebel Supply & Install", href: "/services/hebel-installation" },
                { label: "EPS Cladding Systems", href: "/services/eps-cladding" },
                { label: "Specialty Finishes", href: "/services/specialty-finishes" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/50 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="rk-section-label mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Safety & Compliance", href: "/safety" },
                { label: "Contact", href: "/contact" },
                { label: "Submit Project", href: "/submit-project" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/50 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="rk-section-label mb-4">Sister Brand</h4>
              <a href="https://microcement.king" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#c9a84c] text-sm transition-colors" style={{ fontWeight: 300 }}>
                Micro Cement King →
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="rk-section-label mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="rk-gold mt-0.5 shrink-0" />
                <a href="tel:0731234567" className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>
                  (07) 3123 4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="rk-gold mt-0.5 shrink-0" />
                <a href="mailto:info@renderking.com.au" className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>
                  info@renderking.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="rk-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm" style={{ fontWeight: 300 }}>
                  Greater Brisbane, Gold Coast & Queensland
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/submit-project" className="rk-btn-gold text-xs w-full text-center block">
                Submit a Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs" style={{ fontWeight: 300 }}>
            © {new Date().getFullYear()} Render Render Pty Ltd. All rights reserved. Trading as Render King.
          </p>
          <div className="flex gap-6">
            <span className="text-white/20 text-xs">ABN: XX XXX XXX XXX</span>
            <span className="text-white/20 text-xs">QBCC Licensed</span>
            <span className="text-white/20 text-xs">Dulux Acratex Accredited</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
