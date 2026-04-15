import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wrench, Menu, X, Phone } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: isHome ? "#services" : "/#services" },
    { label: "Why Us", href: isHome ? "#why-us" : "/#why-us" },
    { label: "Reviews", href: isHome ? "#reviews" : "/#reviews" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} id="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Home">
          <Wrench size={22} />
          <span>Nano's Handyman</span>
        </Link>

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith("/") ? (
                <Link to={l.href}>{l.label}</Link>
              ) : (
                <a href={l.href}>{l.label}</a>
              )}
            </li>
          ))}
        </ul>

        <a href={isHome ? "#contact" : "/#contact"} className="btn btn-primary navbar__cta">
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

      <div className={`navbar__mobile ${mobileOpen ? "navbar__mobile--open" : ""}`}>
        {links.map((l) =>
          l.href.startsWith("/") ? (
            <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          )
        )}
        <a
          href={isHome ? "#contact" : "/#contact"}
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
