"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { House, List, X } from "@phosphor-icons/react";
import { dorm } from "@/data/dorm";

const navLinks = [
  { href: "/#rooms", label: "ห้องพัก" },
  { href: "/#amenities", label: "สิ่งอำนวยความสะดวก" },
  { href: "/#location", label: "ที่ตั้ง" },
  { href: "/#faq", label: "คำถามที่พบบ่อย" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ปิดเมนูมือถือเมื่อกด Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0 border-b-white/60 bg-white/85 shadow-[0_1px_0_rgb(15_118_110/0.08)]">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" onClick={close} className="flex min-w-0 items-center gap-2.5 rounded-lg" aria-label={`${dorm.name} หน้าแรก`}>
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-on-primary">
            <House size={20} weight="fill" />
          </span>
          <span className="truncate font-display text-base font-bold whitespace-nowrap text-primary-dark sm:text-lg">{dorm.shortName}</span>
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/booking"
            onClick={close}
            aria-current={pathname === "/booking" ? "page" : undefined}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm whitespace-nowrap sm:px-5 font-semibold text-on-accent shadow-sm transition-colors duration-200 hover:bg-accent-dark"
          >
            จองห้อง
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            className="grid size-11 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-primary/10 md:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="เมนูมือถือ"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/60 md:hidden"
          >
            <ul className="container-page flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center rounded-lg px-2 font-medium transition-colors duration-200 hover:bg-primary/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
