import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Droplets,
  Armchair,
  LayoutGrid,
  SprayCan,
} from "lucide-react";
import "./Services.css";

const services = [
  { icon: Droplets, title: "Plumbing", desc: "Faucet repairs, pipe fixes, toilet installs, and leak detection." },
  { icon: Zap, title: "Electrical", desc: "Outlet installs, light fixtures, ceiling fans, and panel work." },
  { icon: Hammer, title: "Carpentry", desc: "Shelving, trim work, door repairs, and deck maintenance." },
  { icon: Paintbrush, title: "Painting", desc: "Interior & exterior painting, drywall finish, and staining." },
  { icon: Wrench, title: "General Repairs", desc: "Squeaky doors to full home maintenance — we handle it all." },
  { icon: Armchair, title: "Furniture Assembly", desc: "Fast, professional assembly — IKEA, Wayfair, and more." },
  { icon: LayoutGrid, title: "Drywall & Patching", desc: "Hole repairs, texture matching, and full installations." },
  { icon: SprayCan, title: "Pressure Washing", desc: "Driveways, patios, siding, and fences — like new." },
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
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="services__icon">
                <s.icon size={22} strokeWidth={1.8} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
