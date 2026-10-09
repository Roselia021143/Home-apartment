import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  Buildings,
  CaretRight,
  Check,
  Ruler,
  Sparkle,
  Users,
} from "@phosphor-icons/react/ssr";
import Photo from "@/components/Photo";
import RoomCard from "@/components/RoomCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { dorm, formatBaht } from "@/data/dorm";
import { depositOf, floors, getRoom, roomPath, rooms, roomsOnFloor, standardFeatures } from "@/data/rooms";

export const dynamicParams = false;

export function generateStaticParams() {
  return rooms.map((room) => ({ code: room.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps<"/rooms/[code]">): Promise<Metadata> {
  const { code } = await params;
  const room = getRoom(code);
  if (!room) return {};
  return {
    title: `ห้อง ${room.code}`,
    description: `ห้องแอร์ ${room.code} ชั้น ${room.floor} ขนาด ${room.sizeSqm} ตร.ม. ฿${formatBaht(room.pricePerMonth)}/เดือน บิวท์อิน: ${room.builtIns.join(", ")}`,
  };
}

export default async function RoomPage({ params }: PageProps<"/rooms/[code]">) {
  const { code } = await params;
  const room = getRoom(code);
  if (!room) notFound();

  const floor = floors.find((f) => f.floor === room.floor)!;
  const sameFloor = roomsOnFloor(room.floor);
  const index = rooms.indexOf(room);
  const previous = rooms[index - 1];
  const next = rooms[index + 1];
  const images = room.images.length > 0 ? room.images : [undefined, undefined, undefined];
  const deposit = depositOf(room);

  const specs = [
    { icon: Buildings, label: "ชั้น", value: `${room.floor}` },
    { icon: Ruler, label: "ขนาดห้อง", value: `${room.sizeSqm} ตร.ม.` },
    { icon: Users, label: "พักได้สูงสุด", value: `${room.maxOccupants} คน` },
  ];
  const costRows = [
    { label: "ค่าเช่ารายเดือน", value: `฿${formatBaht(room.pricePerMonth)}` },
    { label: "เงินประกัน", value: `฿${formatBaht(deposit)}` },
    { label: "ค่าน้ำ", value: `${dorm.utilities.waterPerUnit} บาท/หน่วย` },
    { label: "ค่าไฟ", value: `${dorm.utilities.electricityPerUnit} บาท/หน่วย` },
    { label: "ที่จอดรถ", value: "ฟรี" },
  ];

  return (
    <div className="container-page py-10">
      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li className="flex items-center gap-1">
            <Link href="/" className="hover:text-primary hover:underline">หน้าแรก</Link>
            <CaretRight size={14} aria-hidden />
          </li>
          <li className="flex items-center gap-1">
            <Link href={`/?floor=${room.floor}#rooms`} className="hover:text-primary hover:underline">
              {floor.name}
            </Link>
            <CaretRight size={14} aria-hidden />
          </li>
          <li aria-current="page" className="font-medium text-foreground">ห้อง {room.code}</li>
        </ol>
      </nav>

      <Reveal className="mt-6 grid gap-3 md:grid-cols-3 md:grid-rows-2">
        {images.slice(0, 3).map((src, imageIndex) => (
          <Photo
            key={imageIndex}
            src={src}
            alt={`ห้อง ${room.code} ภาพที่ ${imageIndex + 1}`}
            priority={imageIndex === 0}
            className={
              imageIndex === 0
                ? "aspect-[4/3] rounded-3xl md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-96"
                : "hidden rounded-3xl md:block"
            }
            sizes={imageIndex === 0 ? "(min-width: 768px) 66vw, 100vw" : "33vw"}
          />
        ))}
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.7fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-accent">
            {floor.name} · {floor.note}
          </p>
          <h1 className="mt-2 flex flex-wrap items-center gap-3 text-4xl font-bold sm:text-5xl">
            ห้อง {room.code}
            {room.highlight && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-sans text-sm font-semibold text-on-primary">
                <Sparkle size={14} weight="fill" aria-hidden />
                {room.highlight}
              </span>
            )}
          </h1>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            {specs.map(({ icon: SpecIcon, label, value }) => (
              <div key={label} className="rounded-2xl bg-card p-4 ring-1 ring-primary/10">
                <SpecIcon size={24} weight="duotone" aria-hidden className="text-primary" />
                <dt className="mt-2 text-xs text-muted-foreground">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 flex items-center gap-2 text-2xl font-bold">
            <Armchair size={28} weight="duotone" aria-hidden className="text-primary" />
            เฟอร์นิเจอร์บิวท์อินของห้องนี้
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">แต่ละห้องตกแต่งไม่เหมือนกัน</p>
          <Stagger as="ul" className="mt-5 grid gap-3 sm:grid-cols-2">
            {room.builtIns.map((item) => (
              <StaggerItem
                as="li"
                key={item}
                className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 font-medium ring-1 ring-primary/15"
              >
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                  <Check size={14} weight="bold" />
                </span>
                {item}
              </StaggerItem>
            ))}
          </Stagger>

          <h2 className="mt-10 text-xl font-bold">มีทุกห้อง</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {standardFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm">
                <Check size={14} weight="bold" aria-hidden className="text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <aside aria-label="ค่าใช้จ่ายและการจอง" className="h-fit md:sticky md:top-24">
          <div className="rounded-3xl bg-card p-7 shadow-xl shadow-primary/10 ring-1 ring-primary/10">
            <p className="text-sm text-muted-foreground">ค่าเช่าห้อง {room.code}</p>
            <p className="font-display text-4xl font-bold text-primary">
              ฿{formatBaht(room.pricePerMonth)}
              <span className="font-sans text-base font-normal text-muted-foreground"> /เดือน</span>
            </p>
            <dl className="mt-6 divide-y divide-primary/10 text-sm">
              {costRows.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-right font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex justify-between gap-4 rounded-xl bg-muted px-4 py-3">
              <span className="text-sm font-medium">จ่ายวันเข้าอยู่</span>
              <span className="font-bold text-primary-dark">฿{formatBaht(room.pricePerMonth + deposit)}</span>
            </div>
            <Link
              href={`/booking?room=${room.code}`}
              className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-colors duration-200 hover:bg-accent-dark"
            >
              จอง / นัดดูห้อง {room.code}
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">ยังไม่ต้องชำระเงิน เจ้าหน้าที่จะติดต่อกลับ</p>
          </div>

          <nav aria-label="ห้องก่อนหน้าและถัดไป" className="mt-4 grid grid-cols-2 gap-3">
            {previous ? (
              <Link
                href={roomPath(previous)}
                className="flex min-h-12 items-center gap-2 rounded-2xl bg-card px-4 text-sm font-medium ring-1 ring-primary/10 transition-colors duration-200 hover:bg-primary/5"
              >
                <ArrowLeft size={16} aria-hidden /> ห้อง {previous.code}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={roomPath(next)}
                className="flex min-h-12 items-center justify-end gap-2 rounded-2xl bg-card px-4 text-sm font-medium ring-1 ring-primary/10 transition-colors duration-200 hover:bg-primary/5"
              >
                ห้อง {next.code} <ArrowRight size={16} aria-hidden />
              </Link>
            )}
          </nav>
        </aside>
      </div>

      <section aria-labelledby="same-floor" className="mt-20">
        <h2 id="same-floor" className="text-2xl font-bold">
          ห้องอื่นใน{floor.name}
        </h2>
        <Stagger as="ul" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sameFloor
            .filter((other) => other.code !== room.code)
            .map((other) => (
              <StaggerItem as="li" key={other.code}>
                <RoomCard room={other} />
              </StaggerItem>
            ))}
        </Stagger>
      </section>
    </div>
  );
}
