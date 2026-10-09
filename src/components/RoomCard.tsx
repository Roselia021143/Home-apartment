import Link from "next/link";
import { ArrowRight, Ruler, Sparkle, Users } from "@phosphor-icons/react/ssr";
import Photo from "@/components/Photo";
import { formatBaht } from "@/data/dorm";
import { roomPath, type Room } from "@/data/rooms";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-[0_1px_2px_rgb(19_78_74/0.06),0_8px_24px_-12px_rgb(19_78_74/0.18)] ring-1 ring-primary/10 transition duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-[0_2px_4px_rgb(19_78_74/0.06),0_20px_40px_-16px_rgb(19_78_74/0.3)]">
      <div className="relative">
        <Photo
          src={room.images[0]}
          alt={`ห้อง ${room.code}`}
          className="aspect-[16/10]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 font-display text-sm font-bold text-primary-dark">
          {room.code}
        </span>
        {room.highlight && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">
            <Sparkle size={12} weight="fill" aria-hidden />
            {room.highlight}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">
          {/* ทำให้ทั้งการ์ดคลิกได้ โดยยังมีลิงก์หลักแค่ลิงก์เดียว */}
          <Link href={roomPath(room)} className="after:absolute after:inset-0 after:content-['']">
            ห้อง {room.code}
          </Link>
        </h3>

        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Ruler size={16} aria-hidden /> {room.sizeSqm} ตร.ม.
          </li>
          <li className="flex items-center gap-1.5">
            <Users size={16} aria-hidden /> {room.maxOccupants} คน
          </li>
        </ul>

        <p className="mt-3 text-xs font-semibold text-accent">บิวท์อินในห้อง</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
          {room.builtIns.slice(0, 3).map((item) => (
            <li key={item} className="rounded-md bg-muted px-2 py-1 text-foreground">
              {item}
            </li>
          ))}
          {room.builtIns.length > 3 && (
            <li className="rounded-md px-1 py-1 text-muted-foreground">+{room.builtIns.length - 3}</li>
          )}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p>
            <span className="font-display text-2xl font-bold text-primary">฿{formatBaht(room.pricePerMonth)}</span>
            <span className="text-sm text-muted-foreground"> /เดือน</span>
          </p>
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-on-primary"
          >
            <ArrowRight size={18} weight="bold" />
          </span>
        </div>
      </div>
    </article>
  );
}
