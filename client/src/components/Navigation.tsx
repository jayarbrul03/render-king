/*
 * RENDER KING — Navigation Component v4
 * Clean premium wordmark — no crown icon
 * RENDER in white / KING in gold — stacked, tight, bold
 * Transparent → dark on scroll
 * Persistent "Submit Project" gold CTA + phone number
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";

const services = [
  { label: "Acrylic Render & Texture Coatings", href: "/services/acrylic-render" },
  { label: "Specialty Finishes & External Microcement", href: "/services/specialty-finishes" },
  { label: "Hebel Supply & Install", href: "/services/hebel-installation" },
  { label: "EPS Cladding Systems", href: "/services/eps-cladding" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`} style={{height: '150px'}}
    >
      <div className="container" style={{paddingTop: '30px'}}>
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo — Full transparent logo mark */}
          <Link href="/" className="flex items-center group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/RKLOGO2TRANS_aad14ce9.webp"
              alt="Render King"
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8" style={{width: '670px', paddingRight: '20px', marginRight: '20px'}}>
            <NavLink href="/" label="Home" current={location === "/"} />

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  location.startsWith("/services")
                    ? "rk-gold"
                    : "text-white/80 hover:text-white"
                }`}
                style={{ letterSpacing: "0.12em", color: '#fafafa' }}
              >
                Services <ChevronDown size={12} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#111] border border-white/10 shadow-2xl">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:bg-[#1a1a1a] border-l-2 border-transparent hover:border-[#c9a84c] transition-all duration-150"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink href="/portfolio" label="Portfolio" current={location === "/portfolio"} />
            <NavLink href="/about" label="About" current={location === "/about"} />
            <NavLink href="/safety" label="Safety" current={location === "/safety"} />
            <NavLink href="/contact" label="Contact" current={location === "/contact"} />
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0468041477"
              className="text-white/60 hover:text-[#c9a84c] text-xs font-semibold transition-colors"
              style={{ letterSpacing: "0.08em", fontWeight: 700, color: '#cbaa4d', fontSize: '15px' }}
            >
              0468 041 477
            </a>
            <Link href="/submit-project" className="rk-btn-gold text-xs" style={{paddingRight: '10px', paddingLeft: '12px'}}>
              Submit Project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="container py-6 flex flex-col gap-1">
            <MobileNavLink href="/" label="Home" />
            <div className="py-2">
              <p className="rk-section-label px-0 mb-2">Services</p>
              {services.map((s) => (
                <MobileNavLink key={s.href} href={s.href} label={s.label} indent />
              ))}
            </div>
            <MobileNavLink href="/portfolio" label="Portfolio" />
            <MobileNavLink href="/about" label="About" />
            <MobileNavLink href="/safety" label="Safety" />
            <MobileNavLink href="/contact" label="Contact" />
            <div className="mt-4 space-y-3">
              <a href="tel:0468041477" className="block text-center text-white/70 text-sm font-semibold py-2">
                0468 041 477
              </a>
              <Link href="/submit-project" className="rk-btn-gold w-full text-center block">
                Submit Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, label, current }: { href: string; label: string; current: boolean }) {
  return (
    <Link
      href={href}
      className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
        current ? "rk-gold" : "text-white/80 hover:text-white"
      }`}
      style={{ letterSpacing: "0.12em", color: '#fafafa' }}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, indent }: { href: string; label: string; indent?: boolean }) {
  return (
    <Link
      href={href}
      className={`block py-3 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white border-b border-white/5 transition-colors ${
        indent ? "pl-4" : ""
      }`}
      style={{ letterSpacing: "0.12em" }}
    >
      {label}
    </Link>
  );
}
