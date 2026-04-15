import { Wrench, Phone, Mail } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="footer__logo">
            <Wrench size={18} />
            <span>Nano's Handyman Services</span>
          </a>
          <p>Professional home repairs and maintenance you can trust.</p>
          <div className="footer__contact-row">
            <Phone size={14} /> <a href="tel:4806223481">(480) 622-3481</a>
          </div>
          <div className="footer__contact-row">
            <Mail size={14} /> <span>emilianomartinez1649@gmail.com</span>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <a href="#services">Services</a>
          <a href="#why-us">Why Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <a href="#services">Plumbing</a>
          <a href="#services">Electrical</a>
          <a href="#services">Carpentry</a>
          <a href="#services">Painting</a>
        </div>

        <div className="footer__col">
          <h4>Hours</h4>
          <p>Mon – Fri: 7am – 6pm</p>
          <p>Saturday: 8am – 4pm</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {year} Nano's Handyman Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
