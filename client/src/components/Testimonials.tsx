import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import "./Testimonials.css";

const reviews = [
  {
    name: "Maria R.",
    text: "Nano fixed our leaking kitchen faucet the same day we called. Super professional, cleaned up everything, and charged a fair price. Will definitely call again!",
    rating: 5,
    service: "Plumbing",
  },
  {
    name: "James & Linda P.",
    text: "We hired Nano's for a full interior paint job. The attention to detail was incredible — clean edges, no drips, and they moved our furniture back exactly where it was.",
    rating: 5,
    service: "Painting",
  },
  {
    name: "David C.",
    text: "Had a bunch of IKEA furniture to assemble after moving. Nano knocked it all out in one afternoon. Fast, careful, everything perfectly assembled. Highly recommend!",
    rating: 5,
    service: "Furniture Assembly",
  },
  {
    name: "Sarah K.",
    text: "Our deck was in terrible shape. Nano replaced rotted boards, sanded, and restained the whole thing. It looks brand new — neighbors keep complimenting it!",
    rating: 5,
    service: "Carpentry",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === reviews.length - 1 ? 0 : i + 1));
  const r = reviews[idx];

  return (
    <section className="section" id="reviews">
      <div className="container text-center">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">What Customers Say</h2>

        <div className="testimonials__carousel">
          <button className="testimonials__arrow" onClick={prev} aria-label="Previous review">
            <ChevronLeft size={20} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className="testimonials__card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <div className="testimonials__stars">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonials__text">"{r.text}"</p>
              <div className="testimonials__meta">
                <span className="testimonials__name">{r.name}</span>
                <span className="testimonials__divider">·</span>
                <span className="testimonials__service">{r.service}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="testimonials__arrow" onClick={next} aria-label="Next review">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="testimonials__dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === idx ? "testimonials__dot--active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
