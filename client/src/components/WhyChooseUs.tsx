import { motion } from "framer-motion";
import { Award, Clock, ShieldCheck, CheckCircle } from "lucide-react";
import "./WhyChooseUs.css";

const reasons = [
  {
    icon: Clock,
    title: "Shows Up On Time",
    desc: "We respect your schedule. Arrive when promised, every appointment.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    desc: "Fully licensed and insured for your protection and peace of mind.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "Not satisfied? We'll come back and make it right — no questions asked.",
  },
  {
    icon: CheckCircle,
    title: "Gets It Done Right",
    desc: "15+ years of experience. Over 2,500 jobs completed with 5-star results.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section why" id="why-us">
      <div className="container">
        <div className="why__inner">
          <motion.div
            className="why__text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">
              Reliable. Professional.<br />Gets it done.
            </h2>
            <p className="section-subtitle">
              We don't just fix things — we earn your trust with honest work,
              fair pricing, and results that speak for themselves.
            </p>
          </motion.div>

          <div className="why__grid">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                className="why__item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="why__icon">
                  <r.icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
