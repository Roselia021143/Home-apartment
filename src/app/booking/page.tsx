import type { Metadata } from "next";
import { ChatCircleText, Clock, Phone, ShieldCheck } from "@phosphor-icons/react/ssr";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/motion/Reveal";
import { dorm } from "@/data/dorm";
import { getRoom } from "@/data/rooms";
import { todayInBangkok } from "@/lib/booking";

export const metadata: Metadata = {
  title: "จองห้อง / นัดดูห้อง",
  description: `กรอกฟอร์มเพื่อจองห้องหรือนัดดูห้องที่${dorm.name} เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง`,
};

const steps = ["กรอกฟอร์มจองห้อง", "เจ้าหน้าที่โทรยืนยันภายใน 24 ชม.", "นัดดูห้องหรือทำสัญญา"];

export default async function BookingPage({ searchParams }: PageProps<"/booking">) {
  const { room } = await searchParams;
  const defaultRoom = typeof room === "string" ? getRoom(room)?.code : undefined;

  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute top-1/2 -right-24 size-96 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_1.4fr] md:py-16">
        <Reveal>
          <p className="text-sm font-semibold text-accent">จองห้อง</p>
          <h1 className="mt-2 text-4xl font-bold">จองห้อง / นัดดูห้อง</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            ใช้เวลาไม่ถึง 2 นาที ยังไม่ต้องชำระเงินจนกว่าจะยืนยันห้อง
          </p>

          <ol className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-on-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="glass mt-10 space-y-3 rounded-2xl p-6 text-sm">
            <p className="font-semibold text-primary-dark">ติดต่อโดยตรง</p>
            <p className="flex items-center gap-2">
              <Phone size={18} aria-hidden className="text-primary" />
              <a href={`tel:${dorm.contact.phone.replaceAll("-", "")}`} className="hover:underline">
                {dorm.contact.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <ChatCircleText size={18} aria-hidden className="text-primary" />
              <a href={dorm.contact.lineUrl} target="_blank" rel="noreferrer" className="hover:underline">
                LINE {dorm.contact.lineId}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={18} aria-hidden className="text-primary" />
              {dorm.contact.officeHours}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck size={18} aria-hidden className="text-primary" />
              ข้อมูลของคุณใช้เพื่อติดต่อกลับเท่านั้น
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative rounded-3xl bg-card p-6 shadow-2xl shadow-primary/10 ring-1 ring-primary/10 sm:p-9">
          <BookingForm defaultRoom={defaultRoom} minDate={todayInBangkok()} />
        </Reveal>
      </div>
    </div>
  );
}
