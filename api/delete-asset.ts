import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
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

  const { public_id, resource_type } = req.body || {};

  if (!public_id) {
    return res.status(400).json({ error: "public_id is required" });
  }

  try {
    const resType = resource_type || "image";
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Generate signature for destroy
    const paramsStr = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(paramsStr).digest("hex");

    const formData = new URLSearchParams();
    formData.append("public_id", public_id);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resType}/destroy`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await response.json();

    if (data.result === "ok") {
      return res.status(200).json({ success: true, result: data.result });
    } else {
      return res.status(400).json({ success: false, result: data.result, error: data });
    }
  } catch (err: any) {
    console.error("Delete asset error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
