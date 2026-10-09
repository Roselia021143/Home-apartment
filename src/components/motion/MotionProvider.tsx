"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user": ปิดแอนิเมชันการเคลื่อนที่อัตโนมัติเมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหวในระบบ
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
