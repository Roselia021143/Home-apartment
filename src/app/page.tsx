import Link from "next/link";
import {
  ArrowRight,
  ChatCircleText,
  CheckCircle,
  MapPin,
  NavigationArrow,
  Phone,
  Plus,
} from "@phosphor-icons/react/ssr";
import AmenityList from "@/components/AmenityList";
import Gallery from "@/components/Gallery";
import Photo from "@/components/Photo";
import FloorRoomPicker from "@/components/FloorRoomPicker";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { dorm, formatBaht } from "@/data/dorm";
import { floors, lowestPrice, rooms } from "@/data/rooms";

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <p className="text-sm font-semibold text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-secondary/25 blur-3xl" />
          <div className="absolute top-24 -right-24 size-[26rem] rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-[#99f6e4]/40 blur-3xl" />
        </div>

        <div className="container-page grid items-center gap-12 pt-12 pb-20 md:grid-cols-[1.05fr_1fr] md:pt-20 md:pb-28">
          <Reveal>
            <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-primary-dark">
              <span aria-hidden className="relative flex size-2.5">
                <span className="absolute inline-flex size-full rounded-full bg-secondary opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              ห้องแอร์ {rooms.length} ห้อง · {floors.length} ชั้น
            </p>
            <h1 id="hero-title" className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              {dorm.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{dorm.slogan}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/booking"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-colors duration-200 hover:bg-accent-dark"
              >
                จองห้อง / นัดดูห้อง
                <ArrowRight size={18} weight="bold" aria-hidden />
              </Link>
              <Link
                href="#rooms"
                className="inline-flex min-h-12 items-center font-semibold text-primary underline-offset-4 hover:underline"
              >
                ดูห้องพักทั้งหมด
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <Photo
              src={dorm.gallery[0]?.src || undefined}
              alt={`ภาพอาคาร${dorm.name}`}
              className="aspect-[4/3] rounded-[2rem] shadow-2xl shadow-primary/20 md:aspect-[4/5]"
              sizes="(min-width: 768px) 45vw, 100vw"
              priority
            />
            <div className="glass absolute -bottom-6 left-4 right-4 rounded-2xl p-5 shadow-xl shadow-primary/10 sm:left-auto sm:-left-6 sm:right-auto sm:w-72">
              <p className="text-sm text-muted-foreground">ค่าเช่าเริ่มต้น</p>
              <p className="font-display text-3xl font-bold text-primary">
                ฿{formatBaht(lowestPrice)}
                <span className="font-sans text-base font-normal text-muted-foreground"> /เดือน</span>
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground">
                <CheckCircle size={18} weight="fill" aria-hidden className="text-primary" />
                ไม่ต้องจ่ายเงินตอนจอง
              </p>
            </div>
          </Reveal>
        </div>

        {/* จุดเด่น */}
        <div className="container-page pb-16">
          <Stagger as="ul" className="glass grid grid-cols-3 overflow-hidden rounded-2xl">
            {dorm.highlights.map((item) => (
              <StaggerItem as="li" key={item.label} className="px-2 py-5 text-center sm:px-6">
                <p className="font-display text-xl font-bold text-primary sm:text-2xl">{item.value}</p>
                <p className="text-xs text-muted-foreground sm:text-sm">{item.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ห้องพัก */}
      <section id="rooms" aria-labelledby="rooms-title" className="bg-card py-20">
        <div className="container-page">
          <SectionHeading id="rooms-title" eyebrow="ห้องพัก" title="เลือกชั้น แล้วเลือกห้องที่ใช่" />
          <FloorRoomPicker />
          <p className="mt-8 rounded-2xl bg-muted px-5 py-4 text-sm text-muted-foreground">
            ทุกห้องมีเครื่องปรับอากาศ เครื่องทำน้ำอุ่น และเฟอร์นิเจอร์บิวท์อินที่แตกต่างกัน ·{" "}
            ค่าน้ำ {dorm.utilities.waterPerUnit} บาท/หน่วย · ค่าไฟ {dorm.utilities.electricityPerUnit} บาท/หน่วย ·{" "}
            {dorm.utilities.internet} · สัญญาขั้นต่ำ {dorm.utilities.contractMonths} เดือน
          </p>
        </div>
      </section>

      {/* สิ่งอำนวยความสะดวก */}
      <section id="amenities" aria-labelledby="amenities-title" className="container-page py-20">
        <SectionHeading id="amenities-title" eyebrow="สิ่งอำนวยความสะดวก" title="ครบ จบ ในที่เดียว" />
        <AmenityList />
      </section>

      {/* แกลเลอรี */}
      <section id="gallery" aria-labelledby="gallery-title" className="container-page pb-20">
        <SectionHeading id="gallery-title" eyebrow="แกลเลอรี" title="บรรยากาศภายในหอพัก" />
        <Gallery />
      </section>

      {/* ที่ตั้ง */}
      <section id="location" aria-labelledby="location-title" className="bg-card py-20">
        <div className="container-page grid items-start gap-10 md:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading id="location-title" eyebrow="ที่ตั้ง" title="เดินทางสะดวก ใกล้ทุกอย่าง" />
            <p className="flex gap-2 leading-relaxed">
              <MapPin size={22} weight="duotone" aria-hidden className="mt-0.5 shrink-0 text-primary" />
              {dorm.address.line}
            </p>
            <Stagger as="ul" className="mt-6 space-y-3">
              {dorm.address.nearby.map((place) => (
                <StaggerItem as="li" key={place} className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
                  <NavigationArrow size={18} weight="duotone" aria-hidden className="shrink-0 text-accent" />
                  {place}
                </StaggerItem>
              ))}
            </Stagger>
            <a
              href={dorm.address.mapLinkUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-primary px-5 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary"
            >
              เปิดใน Google Maps
              <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
          <Reveal delay={0.1}>
            <iframe
              title={`แผนที่${dorm.name}`}
              src={dorm.address.mapEmbedUrl}
              className="aspect-[4/3] w-full rounded-3xl border-0 shadow-xl shadow-primary/10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      {/* ระเบียบ + FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading eyebrow="ระเบียบหอพัก" title="ข้อควรรู้ก่อนเข้าอยู่" />
          <ul className="space-y-3">
            {dorm.rules.map((rule) => (
              <li key={rule} className="flex gap-3">
                <CheckCircle size={22} weight="duotone" aria-hidden className="shrink-0 text-primary" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading id="faq-title" eyebrow="คำถามที่พบบ่อย" title="มีคำถาม? เรามีคำตอบ" />
          <div className="space-y-3">
            {dorm.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-card ring-1 ring-primary/10 transition-shadow duration-200 open:shadow-lg open:shadow-primary/5"
              >
                <summary className="flex min-h-14 list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45"
                  >
                    <Plus size={16} weight="bold" />
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ติดต่อ */}
      <section id="contact" aria-labelledby="contact-title" className="container-page pb-20">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-primary-dark via-primary to-accent px-6 py-14 text-center text-white sm:px-12">
          <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-72 rounded-full bg-white/10 blur-2xl" />
          <h2 id="contact-title" className="text-3xl font-bold sm:text-4xl">
            สนใจห้องพัก? ติดต่อเราได้เลย
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            เจ้าหน้าที่พร้อมตอบทุกคำถาม {dorm.contact.officeHours}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 font-semibold text-primary-dark transition-colors duration-200 hover:bg-background"
            >
              กรอกฟอร์มจองห้อง
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
            <a
              href={`tel:${dorm.contact.phone.replaceAll("-", "")}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/60 px-6 font-semibold transition-colors duration-200 hover:bg-white/10"
            >
              <Phone size={18} aria-hidden /> {dorm.contact.phone}
            </a>
            <a
              href={dorm.contact.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/60 px-6 font-semibold transition-colors duration-200 hover:bg-white/10"
            >
              <ChatCircleText size={18} aria-hidden /> LINE {dorm.contact.lineId}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
