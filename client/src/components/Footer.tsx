/*
 * RENDER KING — Footer Component v3
 * Real contact details. Correct service order. No 'sister brand'.
 * Supplier logos: Dulux Acratex, CSR Hebel, Ensulite
 */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from "@shared/const";

// Supplier badge component
function SupplierBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-block border border-white/15 text-white/40 text-xs font-bold uppercase tracking-widest px-3 py-1.5 hover:border-[#c9a84c]/40 hover:text-white/60 transition-all"
      style={{ letterSpacing: "0.12em" }}
    >
      {name}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8">
      {/* Supplier strip */}
      <div className="border-b border-white/6">
        <div className="container py-6">
          <p className="rk-section-label text-center mb-4">Approved Applicators & Suppliers</p>
          <div className="flex flex-wrap justify-center gap-3">
            <SupplierBadge name="Dulux Acratex" />
            <SupplierBadge name="CSR Hebel" />
            <SupplierBadge name="Dulux Exsulite" />
            <SupplierBadge name="Rockcote" />
            <SupplierBadge name="Hychem" />
            <SupplierBadge name="Ideal Works" />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-16" style={{paddingTop: '60px'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3" style={{marginBottom: '1.5rem'}}>
              {/* Crown mark */}
              <svg width="28" height="21" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 26L8 8L16 18L20 4L24 18L32 8L38 26H2Z" fill="#c9a84c" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round"/>
                <rect x="2" y="26" width="36" height="3" fill="#c9a84c" rx="0.5"/>
                <circle cx="2" cy="8" r="2" fill="#c9a84c"/>
                <circle cx="20" cy="4" r="2" fill="#c9a84c"/>
                <circle cx="38" cy="8" r="2" fill="#c9a84c"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black uppercase tracking-widest text-lg" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em" }}>RENDER</span>
                <span className="rk-gold font-black uppercase tracking-widest text-lg" style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.18em" }}>KING</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4" style={{ fontWeight: 300, color: '#f3f2f2' }}>
              Queensland's largest rendering operation. 24 years. 10,000+ projects. Volume builders trust us because we show up, communicate, and the finish is right.
            </p>
            <p className="text-white/30 text-xs uppercase tracking-wider mb-6" style={{ letterSpacing: "0.12em", color: '#c7c7c7' }}>
              A Render Render Pty Ltd Company
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/renderking.au/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c9a84c] transition-colors">
                <Instagram size={40} />
              </a>
              <a href="https://www.facebook.com/RenderKing.au/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c9a84c] transition-colors">
                <Facebook size={40} />
              </a>
            </div>
          </div>

          {/* Services — correct order: Render first, installations last */}
          <div>
            <h4 className="rk-section-label mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Acrylic Render", href: "/services/acrylic-render" },
                { label: "Texture Coatings", href: "/services/acrylic-render" },
                { label: "Specialty Finishes", href: "/services/specialty-finishes" },
                { label: "External Microcement", href: "/services/specialty-finishes" },
                { label: "Hebel Supply & Install", href: "/services/hebel-installation" },
                { label: "EPS Cladding Supply & Install", href: "/services/eps-cladding" },
              ].map((s) => (
                <li key={s.label}>
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
                { label: "Submit a Project", href: "/submit-project" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/50 hover:text-white text-sm transition-colors" style={{ fontWeight: 300 }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="rk-section-label mb-4" style={{ display: 'none' }}>Related Brands</h4>
              <a href="https://microcementking.com.au" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#c9a84c] text-sm transition-colors block mb-2" style={{ fontWeight: 600, color: '#caa849' }}>
                MICRO CEMENT KING
              </a>
              <p className="text-white/25 text-xs" style={{ fontWeight: 300, color: '#fcfcfc' }}>
                Premium internal microcement finishes — same ownership, same standard.
              </p>
            </div>
          </div>

          {/* Contact — real details */}
          <div>
            <h4 className="rk-section-label mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="rk-gold mt-0.5 shrink-0" />
                <a href={`tel:${CONTACT_PHONE}`} className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontWeight: 300, color: '#f7f7f7' }}>
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="rk-gold mt-0.5 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/60 hover:text-white text-sm transition-colors" style={{ fontWeight: 300, color: '#f2f2f2' }}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="rk-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm" style={{ fontWeight: 300, color: '#fdfcfc' }}>
                  Greater Brisbane, Morayfield to Ipswich to Gold Coast. Queensland Wide.
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
          <p className="text-white/30 text-xs" style={{ fontWeight: 300, color: '#fcfcfc' }}>
            Render Render Pty Ltd. All rights reserved. Trading as Render King © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <span className="text-white/40 text-xs">QBCC Licence No. 15565729</span>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-white/40 text-xs">ABN 58 650 254 256</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
