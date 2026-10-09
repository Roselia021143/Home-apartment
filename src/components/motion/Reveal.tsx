"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// ค่อยๆ เลื่อนขึ้นเมื่อเลื่อนหน้าจอมาถึง (แสดงครั้งเดียว)
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  // ผู้ใช้ที่ตั้งค่าลดการเคลื่อนไหว: แสดงเนื้อหาทันทีโดยไม่ต้องรอแอนิเมชัน
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={item}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
};

// ให้ลูกแต่ละตัว (StaggerItem) ปรากฏต่อกันทีละตัว
export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const Component = as === "ul" ? motion.ul : motion.div;
  const reduceMotion = useReducedMotion();
  return (
    <Component
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
