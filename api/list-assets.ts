import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // PIN check
  const pin = req.headers["x-owner-pin"] as string;
  if (!pin || pin !== process.env.OWNER_PIN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: "Cloudinary credentials not configured" });
  }

  try {
    const prefix = (req.query.prefix as string) || "handyman/projects";
    const authHeader = "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    // Fetch images
    const imageUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(prefix)}&max_results=100&type=upload`;
    const imageRes = await fetch(imageUrl, {
      headers: { Authorization: authHeader },
    });

    let imageData: any = { resources: [] };
    if (imageRes.ok) {
      imageData = await imageRes.json();
    } else {
      const errText = await imageRes.text();
      console.error("Cloudinary image list error:", imageRes.status, errText);
    }

    // Fetch videos
    const videoUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video?prefix=${encodeURIComponent(prefix)}&max_results=100&type=upload`;
    const videoRes = await fetch(videoUrl, {
      headers: { Authorization: authHeader },
    });

    let videoData: any = { resources: [] };
    if (videoRes.ok) {
      videoData = await videoRes.json();
    } else {
      const errText = await videoRes.text();
      console.error("Cloudinary video list error:", videoRes.status, errText);
    }

    // Merge all resources
    const allResources = [
      ...imageData.resources.map((r: any) => ({ ...r, media_type: "image" })),
      ...videoData.resources.map((r: any) => ({ ...r, media_type: "video" })),
    ];

    // Group by project slug
    const projects: Record<string, any[]> = {};
    for (const r of allResources) {
      const publicId: string = r.public_id;
      const afterPrefix = publicId.replace(`${prefix}/`, "");
      const parts = afterPrefix.split("-");
      const typeSuffix = parts[parts.length - 1];
      const isKnownSuffix = ["before", "after", "video"].includes(typeSuffix);
      const slug = isKnownSuffix ? parts.slice(0, -1).join("-") : afterPrefix;

      if (!projects[slug]) projects[slug] = [];
      projects[slug].push({
        public_id: r.public_id,
        secure_url: r.secure_url,
        resource_type: r.resource_type || r.media_type,
        format: r.format,
        created_at: r.created_at,
        bytes: r.bytes,
        width: r.width,
        height: r.height,
        type_label: isKnownSuffix ? typeSuffix : "other",
      });
    }

    return res.status(200).json({ projects, total: allResources.length });
  } catch (err: any) {
    console.error("List assets error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
