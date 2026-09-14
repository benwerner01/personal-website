import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/metadata";

// Replaces the static public/robots.txt, so the sitemap URL shares SITE_URL
const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
