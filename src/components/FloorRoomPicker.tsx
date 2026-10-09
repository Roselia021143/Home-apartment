"use client";

import { useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RoomCard from "@/components/RoomCard";
import { formatBaht } from "@/data/dorm";
import { floors, roomsOnFloor } from "@/data/rooms";

const floorChangeEvent = "floorchange";

function readFloorFromUrl(): number | null {
  const value = Number(new URLSearchParams(window.location.search).get("floor"));
  return floors.some((f) => f.floor === value) ? value : null;
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(floorChangeEvent, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(floorChangeEvent, onChange);
  };
}

// เลือกชั้นก่อน (แท็บ) แล้วแสดงห้องทั้งหมดของชั้นนั้น — ชั้นที่เลือกเก็บไว้ใน URL (?floor=2) เพื่อแชร์ลิงก์ได้
export default function FloorRoomPicker() {
  // ฝั่งเซิร์ฟเวอร์ยังไม่รู้ URL จึงแสดงชั้นแรกก่อน แล้วเปลี่ยนตาม ?floor= หลังโหลดในเบราว์เซอร์
  const urlFloor = useSyncExternalStore(subscribe, readFloorFromUrl, () => null);
  const selected = urlFloor ?? floors[0].floor;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (floor: number, focus = false) => {
    const url = new URL(window.location.href);
    url.searchParams.set("floor", String(floor));
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(floorChangeEvent));
    if (focus) tabRefs.current[floors.findIndex((f) => f.floor === floor)]?.focus();
  };

  // ลูกศรซ้าย/ขวา Home/End เลื่อนระหว่างแท็บ ตามรูปแบบ ARIA Tabs
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = floors.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : undefined;
    if (next === undefined) return;
    event.preventDefault();
    select(floors[next].floor, true);
  };

  const floorRooms = roomsOnFloor(selected);
  const current = floors.find((f) => f.floor === selected)!;
  const minPrice = Math.min(...floorRooms.map((room) => room.pricePerMonth));

  return (
    <div>
      <div role="tablist" aria-label="เลือกชั้น" className="grid grid-cols-3 gap-2 rounded-2xl bg-muted p-1.5 sm:inline-grid sm:min-w-[28rem]">
        {floors.map((floor, index) => {
          const isSelected = floor.floor === selected;
          return (
            <button
              key={floor.floor}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`floor-tab-${floor.floor}`}
              aria-selected={isSelected}
              aria-controls="floor-panel"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(floor.floor)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="relative min-h-14 rounded-xl px-3 py-2 text-center transition-colors duration-200"
            >
              {isSelected && (
                <motion.span
                  layoutId="floor-tab-indicator"
                  aria-hidden
                  className="absolute inset-0 rounded-xl bg-card shadow-md shadow-primary/10"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative block font-semibold ${isSelected ? "text-primary-dark" : "text-muted-foreground"}`}>
                {floor.name}
              </span>
              <span className="relative block text-xs text-muted-foreground">{roomsOnFloor(floor.floor).length} ห้อง</span>
            </button>
          );
        })}
      </div>

      <div id="floor-panel" role="tabpanel" aria-labelledby={`floor-tab-${selected}`} className="mt-6">
        <p className="text-sm text-muted-foreground">
          {current.note} · {floorRooms.length} ห้อง · เริ่มต้น ฿{formatBaht(minPrice)}/เดือน
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {floorRooms.map((room) => (
              <li key={room.code}>
                <RoomCard room={room} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
