import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import "./Contact.css";

const serviceOptions = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "General Repairs",
  "Furniture Assembly",
  "Drywall & Patching",
  "Pressure Washing",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__inner">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="section-subtitle">
              Tell us what you need — we'll get back to you with a free
              estimate, usually the same day.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Call Us</span>
                  <a href="tel:5551234567" className="contact__detail-value">(555) 123-4567</a>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <span className="contact__detail-value">nano@handymanservices.com</span>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Service Area</span>
                  <span className="contact__detail-value">Greater Metro Area</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="card contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Request a Free Estimate</h3>

            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="contact-name">Name</label>
                <input type="text" id="contact-name" placeholder="Your name" required />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-phone">Phone</label>
                <input type="tel" id="contact-phone" placeholder="(555) 000-0000" required />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-email">Email</label>
              <input type="email" id="contact-email" placeholder="you@email.com" />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-service">Service Needed</label>
              <select id="contact-service" required defaultValue="">
                <option value="" disabled>Select a service...</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-desc">Describe the Job</label>
              <textarea id="contact-desc" rows={3} placeholder="Brief description of what you need..." />
            </div>

            <button type="submit" className="btn btn-primary contact__submit" disabled={submitted}>
              {submitted ? "✓ Sent! We'll call you soon." : <>Send Request <Send size={14} /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
