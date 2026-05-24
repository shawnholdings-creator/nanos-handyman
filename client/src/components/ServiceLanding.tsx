import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Phone, LayoutGrid, Zap, Droplets,
  CheckCircle, Star, Clock, MapPin,
} from "lucide-react";
import "./AllServices.css";

interface ServicePageData {
  slug: string;
  title: string;
  metaH1: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  services: string[];
  whyUs: string[];
  cta: string;
}

const servicePages: Record<string, ServicePageData> = {
  "drywall-repair-phoenix": {
    slug: "drywall-repair-phoenix",
    title: "Drywall Repair in Phoenix",
    metaH1: "Drywall Repair in Phoenix, AZ",
    subtitle: "Professional drywall patching, hole repair, and texture matching for homes across the Phoenix metro area. Fast, clean results every time.",
    icon: LayoutGrid,
    services: [
      "Drywall hole repair (small & large)",
      "Texture matching & blending",
      "Water damage drywall repair",
      "Nail pop & crack repair",
      "Full drywall panel replacement",
      "Ceiling drywall repair",
      "Garage drywall installation",
      "Drywall finishing & sanding",
    ],
    whyUs: [
      "Same-day drywall repair available",
      "Clean, dust-free work process",
      "We match your existing texture perfectly",
      "Serving Phoenix, Chandler, Mesa, Tempe & Scottsdale",
    ],
    cta: "Need drywall repair in Phoenix? Get a free estimate today.",
  },
  "ceiling-fan-installation-phoenix": {
    slug: "ceiling-fan-installation-phoenix",
    title: "Ceiling Fan Installation in Phoenix",
    metaH1: "Ceiling Fan Installation in Phoenix, AZ",
    subtitle: "Expert ceiling fan installation for Phoenix homes. Stay cool with professional fan mounting, wiring, and replacement services.",
    icon: Zap,
    services: [
      "New ceiling fan installation",
      "Ceiling fan replacement & upgrade",
      "Light-to-fan conversion",
      "Outdoor ceiling fan mounting",
      "Fan balancing & wobble repair",
      "Remote control fan setup",
      "Fan wiring & switch install",
      "Energy-efficient fan upgrades",
    ],
    whyUs: [
      "Critical for Phoenix summers — stay cool",
      "Professional electrical work",
      "All fan brands supported",
      "Serving Phoenix, Chandler, Mesa, Tempe & Scottsdale",
    ],
    cta: "Need a ceiling fan installed in Phoenix? Get a free estimate today.",
  },
  "faucet-repair-phoenix": {
    slug: "faucet-repair-phoenix",
    title: "Faucet & Plumbing Repair in Phoenix",
    metaH1: "Faucet & Plumbing Repair in Phoenix, AZ",
    subtitle: "Leaky faucet? We handle faucet replacement, plumbing repairs, and fixture installation for Phoenix area homes.",
    icon: Droplets,
    services: [
      "Leaky faucet repair",
      "Kitchen faucet replacement",
      "Bathroom faucet installation",
      "Garbage disposal install/repair",
      "Toilet repair & replacement",
      "Minor pipe leak repair",
      "Shut-off valve replacement",
      "Water line connections",
    ],
    whyUs: [
      "Fast response for plumbing emergencies",
      "Quality fixtures & parts",
      "Clean, mess-free work",
      "Serving Phoenix, Chandler, Mesa, Tempe & Scottsdale",
    ],
    cta: "Need plumbing repair in Phoenix? Get a free estimate today.",
  },
};

export default function ServiceLanding() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const data = servicePages[slug] || null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = `${data.title} | Nano's Home Services`;
    }
  }, [data]);

  if (!data) {
    return (
      <section className="all-services">
        <div className="container" style={{ paddingTop: 120, textAlign: "center" }}>
          <h1>Page Not Found</h1>
          <p>This service page doesn't exist.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  const Icon = data.icon;

  return (
    <section className="all-services">
      <div className="container">
        <div className="all-services__header">
          <Link to="/services" className="all-services__back">
            <ArrowLeft size={16} /> All Services
          </Link>
          <span className="section-label">{data.title}</span>
          <h1>{data.metaH1}</h1>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>

        <div className="all-services__group">
          <h2 className="all-services__group-title">What We Do</h2>
          <div className="all-services__grid">
            {data.services.map((svc, i) => (
              <motion.div
                key={svc}
                className="card all-services__card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <div className="all-services__icon">
                  <CheckCircle size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>{svc}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="all-services__group">
          <h2 className="all-services__group-title">Why Choose Nano's</h2>
          <div className="all-services__grid">
            {data.whyUs.map((reason, i) => (
              <motion.div
                key={reason}
                className="card all-services__card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <div className="all-services__icon">
                  {i === 0 && <Clock size={20} strokeWidth={1.8} />}
                  {i === 1 && <Star size={20} strokeWidth={1.8} />}
                  {i === 2 && <Icon size={20} strokeWidth={1.8} />}
                  {i === 3 && <MapPin size={20} strokeWidth={1.8} />}
                </div>
                <div>
                  <h3>{reason}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="all-services__cta text-center">
          <h2>{data.cta}</h2>
          <div className="all-services__cta-actions">
            <Link to="/#contact" className="btn btn-primary">
              Get a Free Estimate
            </Link>
            <a href="tel:4806223481" className="btn btn-secondary">
              <Phone size={14} /> Call (480) 622-3481
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
