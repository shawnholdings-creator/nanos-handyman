import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Droplets,
  LayoutGrid,
  SprayCan,
  Tv,
  Home,
  ArrowRight,
} from "lucide-react";
import "./Services.css";

const services = [
  { icon: Droplets, title: "Plumbing", desc: "Faucet repairs, pipe leaks, toilet installs, garbage disposals, and water line fixes." },
  { icon: Zap, title: "Electrical", desc: "Outlet installs, light fixtures, ceiling fans, switches, and basic panel work." },
  { icon: Hammer, title: "Carpentry", desc: "Shelving, trim work, door repairs, framing, and general woodwork." },
  { icon: Paintbrush, title: "Painting", desc: "Interior/exterior painting, drywall finishing, touch-ups, and staining." },
  { icon: LayoutGrid, title: "Drywall & Patching", desc: "Hole repair, texture matching, and full drywall installs." },
  { icon: Home, title: "Flooring", desc: "Laminate, vinyl plank, tile installation, and minor floor repairs." },
  { icon: Tv, title: "TV Mounting", desc: "Wall mounting, cable concealment, and full setup." },
  { icon: Wrench, title: "General Repairs", desc: "Home maintenance, minor fixes, and wear-and-tear repairs." },
  { icon: Droplets, title: "Bathroom & Kitchen", desc: "Vanity installs, fixtures, caulking, cabinet fixes, and backsplash." },
  { icon: SprayCan, title: "Pressure Washing", desc: "Driveways, patios, siding, fences, and exterior cleaning." },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container text-center">
        <span className="section-label">Our Services</span>
        <h2 className="section-title">What We Do</h2>
        <p className="section-subtitle">
          Professional repairs and maintenance — done right, on time, every time.
        </p>

        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="card services__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="services__icon">
                <s.icon size={22} strokeWidth={1.8} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link to="/services" className="btn btn-secondary services__view-all">
          View All Services <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
