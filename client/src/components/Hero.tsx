import { motion } from "framer-motion";
import { Shield, Clock, Star, ArrowRight, CheckCircle } from "lucide-react";
import "./Hero.css";

const badges = [
  { icon: CheckCircle, label: "Licensed & Insured" },
  { icon: Clock, label: "Same-Day Service" },
  { icon: Star, label: "5-Star Rated" },
];

export default function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero__badge-top">
            <Shield size={14} />
            <span>Trusted by 2,500+ homeowners</span>
          </div>

          <h1>
            Reliable Handyman Services.<br />
            <span className="text-accent">Done Right, Every Time.</span>
          </h1>

          <p className="hero__subtitle">
            From quick fixes to full renovations — Nano's Handyman shows up on
            time, gets it done right, and leaves your home better than we found it.
          </p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn-primary">
              Get a Free Estimate <ArrowRight size={16} />
            </a>
            <a href="tel:4806223481" className="btn btn-secondary">
              Call (480) 622-3481
            </a>
          </div>

          <div className="hero__badges">
            {badges.map((b) => (
              <div key={b.label} className="hero__badge">
                <b.icon size={16} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="hero__checklist">
            <div className="hero__checklist-header">
              <span>Recent Completed Jobs</span>
            </div>
            {[
              { job: "Kitchen faucet replacement", time: "2 hrs", status: "Done" },
              { job: "Ceiling fan installation", time: "1.5 hrs", status: "Done" },
              { job: "Deck board repair", time: "3 hrs", status: "Done" },
              { job: "Interior wall painting", time: "4 hrs", status: "Done" },
            ].map((item) => (
              <div key={item.job} className="hero__checklist-row">
                <div className="hero__checklist-check">
                  <CheckCircle size={16} />
                </div>
                <div className="hero__checklist-info">
                  <span className="hero__checklist-job">{item.job}</span>
                  <span className="hero__checklist-time">{item.time}</span>
                </div>
                <span className="hero__checklist-status">{item.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
