import type { MetadataRoute } from "next";
import { dorm } from "@/data/dorm";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${dorm.siteUrl}/sitemap.xml`,
  };
}
