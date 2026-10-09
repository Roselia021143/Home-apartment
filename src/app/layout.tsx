import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import { dorm } from "@/data/dorm";
import "./globals.css";

// Cinzel/Josefin Sans ที่ design system แนะนำไม่รองรับภาษาไทย จึงใช้ฟอนต์ไทยที่อารมณ์ใกล้เคียงกันแทน
const bodyFont = IBM_Plex_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

const headingFont = Noto_Serif_Thai({
  variable: "--font-heading",
  subsets: ["thai", "latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(dorm.siteUrl),
  title: {
    default: `${dorm.name} – ${dorm.slogan}`,
    template: `%s | ${dorm.name}`,
  },
  description: dorm.description,
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: dorm.name,
    title: dorm.name,
    description: dorm.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
