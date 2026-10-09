import type { MetadataRoute } from "next";
import { dorm } from "@/data/dorm";
import { roomPath, rooms } from "@/data/rooms";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: dorm.siteUrl, priority: 1 },
    { url: `${dorm.siteUrl}/booking`, priority: 0.8 },
    ...rooms.map((room) => ({ url: `${dorm.siteUrl}${roomPath(room)}`, priority: 0.7 })),
  ];
}
