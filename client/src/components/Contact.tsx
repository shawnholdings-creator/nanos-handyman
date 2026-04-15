import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle, ArrowLeft } from "lucide-react";
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
  "Flooring",
  "TV Mounting",
  "Bathroom & Kitchen",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/shawnsunder@yahoo.com", {
        method: "POST",
        body: formData,
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="section contact" id="contact">
        <div className="container">
          <motion.div
            className="contact__thankyou"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="contact__thankyou-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Thank You!</h2>
            <p>
              Your request has been submitted successfully. We'll review the
              details and get back to you within <strong>24 hours</strong> —
              usually much sooner.
            </p>
            <div className="contact__thankyou-info">
              <p>Need something urgent? Give us a call:</p>
              <a href="tel:4806223481" className="btn btn-primary">
                <Phone size={14} /> Call (480) 622-3481
              </a>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => setSubmitted(false)}
            >
              <ArrowLeft size={14} /> Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

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
                  <a href="tel:4806223481" className="contact__detail-value">(480) 622-3481</a>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <span className="contact__detail-value">emilianomartinez1649@gmail.com</span>
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
                <input type="text" id="contact-name" name="name" placeholder="Your name" required />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-phone">Phone</label>
                <input type="tel" id="contact-phone" name="phone" placeholder="(555) 000-0000" required />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-email">Email</label>
              <input type="email" id="contact-email" name="email" placeholder="you@email.com" />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-service">Service Needed</label>
              <select id="contact-service" name="service" required defaultValue="">
                <option value="" disabled>Select a service...</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-desc">Describe the Job</label>
              <textarea id="contact-desc" name="message" rows={3} placeholder="Brief description of what you need..." />
            </div>

            {/* FormSubmit config */}
            <input type="hidden" name="_subject" value="New Quote Request — Nano's Handyman" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
              {sending ? "Sending..." : <>Send Request <Send size={14} /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
