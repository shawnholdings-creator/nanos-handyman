import { useState, useEffect, useCallback } from "react";
import {
  Lock,
  Upload,
  Image,
  Video,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  LogOut,
  Camera,
} from "lucide-react";
import "./OwnerPage.css";

// ---- Types ----
interface Asset {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  created_at: string;
  bytes: number;
  width?: number;
  height?: number;
  type_label: string;
}

interface ProjectMap {
  [slug: string]: Asset[];
}

type MediaType = "before" | "after" | "video";

interface Toast {
  type: "success" | "error";
  message: string;
}

// ---- PIN Gate ----
function PinGate({ onUnlock }: { onUnlock: (pin: string) => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ownerPin = import.meta.env.VITE_OWNER_PIN;
    if (pin === ownerPin) {
      sessionStorage.setItem("owner_pin", pin);
      onUnlock(pin);
    } else {
      setError("Invalid PIN. Try again.");
      setPin("");
    }
  };

  return (
    <div className="owner__gate">
      <Lock size={40} color="var(--navy)" />
      <h2>Owner Access</h2>
      <p>Enter your PIN to manage media</p>
      <form onSubmit={handleSubmit}>
        <input
          className="owner__gate-input"
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError("");
          }}
          placeholder="PIN"
          autoFocus
        />
        <button type="submit" className="btn btn-primary owner__gate-btn">
          Unlock
        </button>
        {error && <p className="owner__gate-error">{error}</p>}
      </form>
    </div>
  );
}

// ---- Cloudinary Widget Loader ----
function loadCloudinaryWidget(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).cloudinary) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

// ---- Main Owner Page ----
export default function OwnerPage() {
  const [pin, setPin] = useState<string | null>(() =>
    sessionStorage.getItem("owner_pin")
  );
  const [slug, setSlug] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("before");
  const [projects, setProjects] = useState<ProjectMap>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Asset | null>(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Fetch assets
  const fetchAssets = useCallback(async () => {
    if (!pin) return;
    setLoading(true);
    try {
      const res = await fetch("/api/list-assets?prefix=handyman/projects", {
        headers: { "x-owner-pin": pin },
      });
      if (!res.ok) throw new Error("Failed to load assets");
      const data = await res.json();
      setProjects(data.projects || {});
    } catch (err: any) {
      showToast("error", err.message || "Failed to load assets");
    } finally {
      setLoading(false);
    }
  }, [pin, showToast]);

  useEffect(() => {
    if (pin) fetchAssets();
  }, [pin, fetchAssets]);

  // Upload via Cloudinary Widget
  const handleUpload = async () => {
    if (!slug.trim()) {
      showToast("error", "Enter a project slug first");
      return;
    }

    await loadCloudinaryWidget();

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      showToast("error", "Cloudinary not configured. Set env vars.");
      return;
    }

    const publicId = `handyman/projects/${slug.trim().toLowerCase().replace(/\s+/g, "-")}-${mediaType}`;

    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        publicId,
        folder: "", // public_id already has the path
        sources: ["local", "camera"],
        multiple: false,
        maxFiles: 1,
        resourceType: mediaType === "video" ? "video" : "image",
        maxFileSize: mediaType === "video" ? 50000000 : 10000000, // 50MB video, 10MB image
        cropping: mediaType !== "video",
        showAdvancedOptions: false,
        styles: {
          palette: {
            window: "#ffffff",
            windowBorder: "#e2e6eb",
            tabIcon: "#1e3a5f",
            menuIcons: "#4b5e73",
            textDark: "#1e3a5f",
            textLight: "#ffffff",
            link: "#f97316",
            action: "#f97316",
            inactiveTabIcon: "#8899a8",
            error: "#dc2626",
            inProgress: "#f97316",
            complete: "#16a34a",
            sourceBg: "#f7f8fa",
          },
        },
      },
      (error: any, result: any) => {
        if (error) {
          showToast("error", "Upload failed: " + (error.message || "Unknown error"));
          return;
        }
        if (result.event === "success") {
          showToast("success", `Uploaded: ${mediaType} photo for "${slug}"`);
          fetchAssets();
          widget.close();
        }
      }
    );

    widget.open();
  };

  // Delete asset
  const handleDelete = async () => {
    if (!deleteTarget || !pin) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/delete-asset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-owner-pin": pin,
        },
        body: JSON.stringify({
          public_id: deleteTarget.public_id,
          resource_type: deleteTarget.resource_type,
        }),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Asset deleted");
      setDeleteTarget(null);
      fetchAssets();
    } catch (err: any) {
      showToast("error", err.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("owner_pin");
    setPin(null);
    setProjects({});
  };

  // Format bytes
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  // ---- Render ----
  if (!pin) {
    return (
      <section className="owner">
        <PinGate onUnlock={(p) => setPin(p)} />
      </section>
    );
  }

  const projectSlugs = Object.keys(projects).sort();

  return (
    <section className="owner">
      <div className="owner__dashboard">
        {/* Header */}
        <div className="owner__header">
          <h2>📷 Media Manager</h2>
          <button className="owner__logout" onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`owner__toast owner__toast--${toast.type}`}>
            {toast.type === "success" ? (
              <CheckCircle size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {toast.message}
          </div>
        )}

        {/* Upload Card */}
        <div className="owner__upload-card">
          <h3>Upload Media</h3>

          <div className="owner__field">
            <label htmlFor="owner-slug">Project Slug</label>
            <input
              id="owner-slug"
              type="text"
              placeholder="e.g. kitchen-remodel-smith"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="owner__field">
            <label>Media Type</label>
            <div className="owner__type-selector">
              {(["before", "after", "video"] as MediaType[]).map((t) => (
                <button
                  key={t}
                  className={`owner__type-btn ${mediaType === t ? "owner__type-btn--active" : ""}`}
                  onClick={() => setMediaType(t)}
                  type="button"
                >
                  {t === "before" && <Camera size={20} />}
                  {t === "after" && <Image size={20} />}
                  {t === "video" && <Video size={20} />}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary owner__upload-btn"
            onClick={handleUpload}
            disabled={!slug.trim()}
          >
            <Upload size={18} />
            Upload {mediaType === "video" ? "Video" : "Photo"}
          </button>
        </div>

        {/* Gallery */}
        <div className="owner__gallery">
          <div className="owner__gallery-header">
            <h3>Projects ({projectSlugs.length})</h3>
            <button className="owner__refresh-btn" onClick={fetchAssets}>
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {loading && (
            <div className="owner__spinner">Loading assets...</div>
          )}

          {!loading && projectSlugs.length === 0 && (
            <div className="owner__empty">
              No projects yet. Upload your first photo above.
            </div>
          )}

          {projectSlugs.map((slug) => (
            <div key={slug} className="owner__project">
              <div className="owner__project-header">
                <span className="owner__project-name">{slug}</span>
                <span className="owner__project-count">
                  {projects[slug].length} asset{projects[slug].length !== 1 ? "s" : ""}
                </span>
              </div>
              {projects[slug].map((asset) => (
                <div key={asset.public_id} className="owner__asset">
                  {asset.resource_type === "video" ? (
                    <Video
                      size={24}
                      style={{
                        width: 56,
                        height: 56,
                        padding: 16,
                        background: "var(--bg-secondary)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-muted)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <img
                      src={asset.secure_url}
                      alt={asset.type_label}
                      className="owner__asset-thumb"
                      loading="lazy"
                    />
                  )}
                  <div className="owner__asset-info">
                    <div className="owner__asset-label">{asset.type_label}</div>
                    <div className="owner__asset-meta">
                      {asset.format?.toUpperCase()} · {formatSize(asset.bytes)}
                    </div>
                  </div>
                  <button
                    className="owner__asset-delete"
                    onClick={() => setDeleteTarget(asset)}
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div
          className="owner__confirm-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null);
          }}
        >
          <div className="owner__confirm">
            <h4>Delete Asset?</h4>
            <p>
              This will permanently remove this {deleteTarget.resource_type} from
              Cloudinary.
            </p>
            <div className="owner__confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn owner__confirm-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
