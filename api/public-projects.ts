import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: "Cloudinary credentials not configured" });
  }

  try {
    const prefix = "handyman/projects";
    const authHeader = "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const imageUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(prefix)}&max_results=100&type=upload`;
    const imageRes = await fetch(imageUrl, {
      headers: { Authorization: authHeader },
    });

    let imageData: any = { resources: [] };
    if (imageRes.ok) {
      imageData = await imageRes.json();
    }

    // Group by project slug
    const projects: Record<string, any> = {};
    for (const r of imageData.resources) {
      const publicId: string = r.public_id;
      const afterPrefix = publicId.replace(`${prefix}/`, "");
      const parts = afterPrefix.split("-");
      const typeSuffix = parts[parts.length - 1];
      const isKnownSuffix = ["before", "after"].includes(typeSuffix);
      const slug = isKnownSuffix ? parts.slice(0, -1).join("-") : afterPrefix;

      if (!projects[slug]) {
        projects[slug] = { slug, before: null, after: null };
      }

      if (typeSuffix === "before") {
        projects[slug].before = r.secure_url;
      } else if (typeSuffix === "after") {
        projects[slug].after = r.secure_url;
      }
    }

    // Only return projects with at least one image
    const projectList = Object.values(projects).filter(
      (p: any) => p.before || p.after
    );

    // Cache for 60 seconds
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ projects: projectList });
  } catch (err: any) {
    console.error("Public projects error:", err);
    return res.status(500).json({ error: "Failed to load projects" });
  }
}
