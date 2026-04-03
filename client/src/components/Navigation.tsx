/*
 * RENDER KING — Navigation Component v5
 * Click-toggle Services dropdown with click-outside-to-close
 * Hover still works on desktop; click works everywhere
 */
import { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when navigating to a new page
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`} style={{height: '170px'}}
    >
      <div className="container" style={{paddingTop: '30px', paddingBottom: '60px'}}>
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/RKLOGO2COPY_TRIMMED_d7884842.png"
              alt="Render King"
              style={{ width: '160px', height: '160px', objectFit: 'contain', objectPosition: 'left center', paddingTop: '20px' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8" style={{width: '670px', paddingRight: '20px', marginRight: '20px'}}>
            <NavLink href="/" label="Home" current={location === "/"} />

            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  location.startsWith("/services") ? "rk-gold" : "text-white/80 hover:text-white"
                }`}
                style={{ letterSpacing: "0.12em", color: '#fafafa' }}
              >
                Services <ChevronDown size={12} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#111] border border-white/10 shadow-2xl z-50">
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
            <div className="mt-4">
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
