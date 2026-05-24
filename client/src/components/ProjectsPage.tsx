import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import "./ProjectsPage.css";

interface Project {
  slug: string;
  before: string | null;
  after: string | null;
}

// ---- Before / After Comparison Slider ----
function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  const updateSplit = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplit(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateSplit(e.clientX);
  }, [updateSplit]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateSplit(e.clientX);
  }, [updateSplit]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      className="projects__comparison"
      ref={containerRef}
      style={{ "--split": `${split}%` } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <img src={before} alt="Before home repair in Phoenix" className="projects__comparison-img" loading="lazy" />
      <img src={after} alt="After home repair in Phoenix" className="projects__comparison-img projects__comparison-after" loading="lazy" />
      <div className="projects__comparison-divider" />
      <div className="projects__comparison-handle">
        <ChevronLeft size={12} />
        <ChevronRight size={12} />
      </div>
    </div>
  );
}

// ---- Main Projects Page ----
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/public-projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data.projects || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const formatSlug = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section className="projects">
      <div className="projects__header">
        <Link to="/" className="projects__back">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <span className="projects__badge">
          <Camera size={14} /> OUR WORK
        </span>
        <h1 className="section-title">Before & After Home Services Work in Phoenix</h1>
        <p className="section-subtitle">
          See the difference Nano's Home Services makes — real home repair projects in Phoenix, real results.
        </p>
      </div>

      {loading && (
        <div className="projects__loading">Loading projects...</div>
      )}

      {error && (
        <div className="projects__empty">
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="projects__empty">
          <h3>Projects Coming Soon</h3>
          <p>We're adding our latest before & after photos. Check back soon!</p>
        </div>
      )}

      <div className="projects__grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            className="projects__card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="projects__card-header">
              <span className="projects__card-title">
                {formatSlug(project.slug)}
              </span>
            </div>

            {project.before && project.after ? (
              <>
                <ComparisonSlider before={project.before} after={project.after} />
                <div className="projects__labels">
                  <span className="projects__label projects__label--before">
                    ← Before
                  </span>
                  <span className="projects__label projects__label--after">
                    After →
                  </span>
                </div>
              </>
            ) : (
              <>
                <img
                  src={(project.before || project.after)!}
                  alt={`${formatSlug(project.slug)} - home services project in Phoenix`}
                  className="projects__single-img"
                  loading="lazy"
                />
                <div className="projects__single-label">
                  {project.before ? "Before" : "After"}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {!loading && projects.length > 0 && (
        <div className="projects__cta">
          <p>Ready to transform your home?</p>
          <Link to="/#contact" className="btn btn-primary">
            Get a Free Estimate →
          </Link>
        </div>
      )}
    </section>
  );
}
