import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplets, Zap, Hammer, Paintbrush, Wrench, LayoutGrid, SprayCan,
  Armchair, DoorOpen, Home, Grid3x3, UtensilsCrossed, Bath, Monitor,
  Tv, Frame, Warehouse, PanelTop, Wind, Fence, TreePine, Landmark,
  Layers, PenLine, Lightbulb, Wifi, CalendarCheck, CloudRain, Filter,
  Truck, Sparkles, Building2, ArrowLeft, Phone,
} from "lucide-react";
import "./AllServices.css";

const sections = [
  {
    title: "Core Services",
    items: [
      { icon: Droplets, name: "Plumbing", desc: "Faucet repairs, pipe leaks, toilet installs, garbage disposals, and water line fixes." },
      { icon: Zap, name: "Electrical", desc: "Outlet installs, light fixtures, ceiling fans, switches, and basic panel work." },
      { icon: Hammer, name: "Carpentry", desc: "Shelving, trim work, door repairs, framing, and general woodwork." },
      { icon: Paintbrush, name: "Painting", desc: "Interior/exterior painting, drywall finishing, touch-ups, and staining." },
      { icon: Wrench, name: "General Repairs", desc: "Home maintenance, minor fixes, and wear-and-tear repairs." },
      { icon: Armchair, name: "Furniture Assembly", desc: "IKEA, Wayfair, office furniture, and custom setups." },
      { icon: LayoutGrid, name: "Drywall & Patching", desc: "Hole repair, texture matching, and full drywall installs." },
      { icon: SprayCan, name: "Pressure Washing", desc: "Driveways, patios, siding, fences, and exterior cleaning." },
    ],
  },
  {
    title: "Interior Services",
    items: [
      { icon: DoorOpen, name: "Door & Hardware Repair", desc: "Door alignment, hinges, locks, handles, and sliding doors." },
      { icon: Home, name: "Flooring Installation", desc: "Laminate, vinyl plank (LVP), tile, and minor floor repairs." },
      { icon: Grid3x3, name: "Tile & Grout Work", desc: "Tile installation, grout repair, caulking, and sealing." },
      { icon: UtensilsCrossed, name: "Kitchen Repairs", desc: "Cabinet fixes, hardware install, backsplash, and minor upgrades." },
      { icon: Bath, name: "Bathroom Repairs", desc: "Vanity install, fixtures, caulking, and shower repairs." },
      { icon: Monitor, name: "Appliance Installation", desc: "Dishwashers, microwaves, washers/dryers hookups." },
      { icon: Tv, name: "TV Mounting", desc: "Wall mounting, cable concealment, and setup." },
      { icon: Frame, name: "Wall Mounting & Hanging", desc: "Shelves, mirrors, artwork, curtains, and blinds." },
      { icon: Warehouse, name: "Closet Systems", desc: "Closet shelving, rods, and storage solutions." },
      { icon: PanelTop, name: "Window Repairs", desc: "Screen replacement, sealing, and hardware fixes." },
      { icon: Wind, name: "Weatherproofing", desc: "Door seals, insulation, and draft fixes." },
    ],
  },
  {
    title: "Exterior Services",
    items: [
      { icon: Fence, name: "Fence & Gate Repair", desc: "Wood/metal fence fixes and gate alignment." },
      { icon: TreePine, name: "Deck & Patio Repair", desc: "Boards, railings, staining, and sealing." },
      { icon: Landmark, name: "Exterior Maintenance", desc: "Siding repair, trim replacement, and minor structural fixes." },
      { icon: Layers, name: "Concrete & Minor Masonry", desc: "Crack repair, patching, and leveling." },
      { icon: PenLine, name: "Caulking & Sealing", desc: "Kitchens, bathrooms, windows, and exterior gaps." },
    ],
  },
  {
    title: "Upgrades & Smart Home",
    items: [
      { icon: Lightbulb, name: "Light Fixture Upgrades", desc: "Chandeliers, recessed lighting swaps." },
      { icon: Wifi, name: "Smart Home Installations", desc: "Doorbells, thermostats, and cameras." },
    ],
  },
  {
    title: "Maintenance & Packages",
    items: [
      { icon: CalendarCheck, name: "Home Maintenance Packages", desc: "Seasonal checkups and minor repairs." },
      { icon: CloudRain, name: "Gutter Cleaning", desc: "Debris removal and flushing." },
      { icon: Filter, name: "Filter Replacement", desc: "HVAC filters and basic upkeep." },
      { icon: Truck, name: "Move-In / Move-Out Repairs", desc: "Quick fixes for renters and home sales." },
      { icon: Sparkles, name: "Home Refresh Packages", desc: "Paint touch-ups + minor repairs bundle." },
      { icon: Building2, name: "Rental Property Maintenance", desc: "Ongoing handyman support for landlords." },
    ],
  },
];

export default function AllServices() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <section className="all-services">
      <div className="container">
        {/* Header */}
        <div className="all-services__header">
          <Link to="/" className="all-services__back">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className="section-label">Full Service List</span>
          <h1>Everything We Do</h1>
          <p className="section-subtitle">
            From quick fixes to full renovations — here's every service Nano's Handyman offers.
          </p>
        </div>

        {/* Service Groups */}
        {sections.map((section, si) => (
          <div key={section.title} className="all-services__group">
            <h2 className="all-services__group-title">{section.title}</h2>
            <div className="all-services__grid">
              {section.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="card all-services__card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <div className="all-services__icon">
                    <item.icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="all-services__cta text-center">
          <h2>Ready to Get Started?</h2>
          <p>Contact us for a free estimate on any service.</p>
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
