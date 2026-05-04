/*
 * RENDER KING — Navigation Component v6
 * Single Services link (no dropdown), tight gap to fit all items
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
      style={{ height: "170px" }}
    >
      <div className="container" style={{ paddingTop: "30px", paddingBottom: "60px" }}>
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663344127014/ksfNM5oyScSHuXPipwyMyz/RKLOGO2COPY_TRIMMED_d7884842.png"
              alt="Render King"
              style={{ width: "160px", height: "160px", objectFit: "contain", objectPosition: "left center", paddingTop: "20px" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0" style={{ paddingRight: "16px" }}>
            <NavLink href="/" label="Home" current={location === "/"} />
            <NavLink href="/services" label="Services" current={location.startsWith("/services")} />
            <NavLink href="/portfolio" label="Portfolio" current={location === "/portfolio"} />
            <NavLink href="/about" label="About" current={location === "/about"} />
            <NavLink href="/safety" label="Safety" current={location === "/safety"} />
            <NavLink href="/contact" label="Contact" current={location === "/contact"} />
            <NavLink href="/blog" label="Blog" current={location.startsWith("/blog")} />
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              href="/submit-project"
              className="rk-btn-gold text-xs whitespace-nowrap"
              style={{ paddingRight: "12px", paddingLeft: "12px" }}
            >
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
            <MobileNavLink href="/services" label="Services" />
            <MobileNavLink href="/portfolio" label="Portfolio" />
            <MobileNavLink href="/about" label="About" />
            <MobileNavLink href="/safety" label="Safety" />
            <MobileNavLink href="/contact" label="Contact" />
            <MobileNavLink href="/blog" label="Blog" />
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
      className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 whitespace-nowrap ${
        current ? "rk-gold" : "text-white/80 hover:text-white"
      }`}
      style={{ letterSpacing: "0.10em" }}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block py-3 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white border-b border-white/5 transition-colors"
      style={{ letterSpacing: "0.12em" }}
    >
      {label}
    </Link>
  );
}
