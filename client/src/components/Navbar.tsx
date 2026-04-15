import { useState, useEffect } from "react";
import { Wrench, Menu, X, Phone } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} id="navbar">
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo" aria-label="Home">
          <Wrench size={22} />
          <span>Nano's Handyman</span>
        </a>

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-primary navbar__cta">
          <Phone size={14} /> Get a Quote
        </a>

        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? "navbar__mobile--open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn-primary"
          onClick={() => setMobileOpen(false)}
          style={{ marginTop: 8 }}
        >
          <Phone size={14} /> Get a Quote
        </a>
      </div>
    </nav>
  );
}
