import { ChatCircleText, Clock, House, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { dorm } from "@/data/dorm";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
            <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-white/10">
              <House size={20} weight="fill" />
            </span>
            {dorm.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{dorm.slogan}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">ที่อยู่</p>
          <p className="mt-3 flex gap-2 leading-relaxed">
            <MapPin size={18} aria-hidden className="mt-0.5 shrink-0 text-secondary" />
            {dorm.address.line}
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">ติดต่อ</p>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-center gap-2">
              <Phone size={18} aria-hidden className="shrink-0 text-secondary" />
              <a href={`tel:${dorm.contact.phone.replaceAll("-", "")}`} className="hover:text-white hover:underline">
                {dorm.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <ChatCircleText size={18} aria-hidden className="shrink-0 text-secondary" />
              <a href={dorm.contact.lineUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                LINE {dorm.contact.lineId}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={18} aria-hidden className="shrink-0 text-secondary" />
              {dorm.contact.officeHours}
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {dorm.name}
      </p>
    </footer>
  );
}
