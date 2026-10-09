"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle, House, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
import { submitBooking } from "@/app/booking/actions";
import { dorm, formatBaht } from "@/data/dorm";
import { floors, roomsOnFloor } from "@/data/rooms";
import { requestTypes, type BookingField, type BookingFormState } from "@/lib/booking";

const initialState: BookingFormState = { status: "idle", submissionId: 0 };

const fieldLabels: Record<BookingField, string> = {
  requestType: "ประเภทคำขอ",
  room: "ห้อง",
  name: "ชื่อ-นามสกุล",
  phone: "เบอร์โทรศัพท์",
  lineId: "LINE ID",
  email: "อีเมล",
  date: "วันที่",
  occupants: "จำนวนผู้พัก",
  note: "หมายเหตุ",
};

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-foreground/15 bg-white px-4 py-2.5 text-base transition-colors duration-200 outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15";

const choiceClass =
  "flex min-h-12 items-center gap-3 rounded-xl border border-foreground/15 bg-white px-4 py-3 transition-colors duration-200 hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-2 has-[:checked]:ring-primary/20 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/40";

function FieldError({ name, error }: { name: BookingField; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
      <WarningCircle size={16} weight="fill" aria-hidden className="shrink-0" />
      {error}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  const Tag = htmlFor ? "label" : "span";
  return (
    <Tag {...(htmlFor ? { htmlFor } : {})} className="text-sm font-semibold">
      {children}
      {optional ? (
        <span className="font-normal text-muted-foreground"> (ไม่บังคับ)</span>
      ) : (
        <span aria-hidden className="text-destructive"> *</span>
      )}
    </Tag>
  );
}

export default function BookingForm({ defaultRoom, minDate }: { defaultRoom?: string; minDate: string }) {
  const [state, formAction, pending] = useActionState(submitBooking, initialState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // ย้ายโฟกัสไปที่สรุปข้อผิดพลาด/ข้อความสำเร็จหลังส่ง เพื่อให้ผู้ใช้ทุกคน (รวมถึง screen reader) รู้ผลทันที
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state.status, state.submissionId]);

  if (state.status === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="py-8 text-center outline-none"
      >
        <span aria-hidden className="mx-auto grid size-20 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle size={48} weight="fill" />
        </span>
        <h2 className="mt-6 text-2xl font-bold">ส่งคำขอเรียบร้อยแล้ว</h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">
          ขอบคุณที่สนใจ{dorm.name} เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง หากต้องการติดต่อด่วน โทร{" "}
          {dorm.contact.phone} หรือ LINE {dorm.contact.lineId}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-primary px-6 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary"
        >
          <House size={18} aria-hidden /> กลับหน้าแรก
        </Link>
      </motion.div>
    );
  }

  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};
  const errorEntries = Object.entries(errors).filter(([, message]) => message) as [BookingField, string][];
  const describe = (name: BookingField) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    // key ทำให้ฟอร์มสร้างใหม่หลังส่งแต่ละครั้ง เพื่อคงค่าที่กรอกไว้เมื่อมีข้อผิดพลาด
    <form key={state.submissionId} action={formAction} noValidate className="space-y-6">
      {state.status === "error" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-title"
          className="rounded-2xl border border-destructive/30 bg-red-50 p-5 outline-none focus-visible:ring-4 focus-visible:ring-destructive/20"
        >
          <p id="error-title" className="flex items-center gap-2 font-semibold text-destructive">
            <WarningCircle size={20} weight="fill" aria-hidden />
            {state.message}
          </p>
          {errorEntries.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-9 text-sm text-red-800">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${field}`} className="underline underline-offset-2 hover:no-underline">
                    {fieldLabels[field]}: {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <fieldset id="requestType" {...describe("requestType")}>
        <legend>
          <Label>ต้องการ</Label>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {Object.entries(requestTypes).map(([value, label]) => (
            <label key={value} className={`${choiceClass} justify-center font-semibold`}>
              <input
                type="radio"
                name="requestType"
                value={value}
                defaultChecked={(values.requestType || "booking") === value}
                className="sr-only"
              />
              {value === "visit" ? (
                <CalendarCheck size={20} aria-hidden className="text-primary" />
              ) : (
                <House size={20} aria-hidden className="text-primary" />
              )}
              {label}
            </label>
          ))}
        </div>
        <FieldError name="requestType" error={errors.requestType} />
      </fieldset>

      <div>
        <Label htmlFor="room">ห้องที่สนใจ</Label>
        <select
          id="room"
          name="room"
          defaultValue={values.room ?? defaultRoom ?? ""}
          className={inputClass}
          {...describe("room")}
        >
          <option value="" disabled>
            เลือกห้อง
          </option>
          {floors.map((floor) => (
            <optgroup key={floor.floor} label={floor.name}>
              {roomsOnFloor(floor.floor).map((room) => (
                <option key={room.code} value={room.code}>
                  ห้อง {room.code} – {room.sizeSqm} ตร.ม. – ฿{formatBaht(room.pricePerMonth)}/เดือน
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <FieldError name="room" error={errors.room} />
      </div>

      <div>
        <Label htmlFor="name">ชื่อ-นามสกุล</Label>
        <input id="name" name="name" autoComplete="name" defaultValue={values.name} className={inputClass} {...describe("name")} />
        <FieldError name="name" error={errors.name} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="081-234-5678"
            defaultValue={values.phone}
            className={inputClass}
            {...describe("phone")}
          />
          <FieldError name="phone" error={errors.phone} />
        </div>
        <div>
          <Label htmlFor="lineId" optional>
            LINE ID
          </Label>
          <input id="lineId" name="lineId" defaultValue={values.lineId} className={inputClass} {...describe("lineId")} />
          <FieldError name="lineId" error={errors.lineId} />
        </div>
      </div>

      <div>
        <Label htmlFor="email" optional>
          อีเมล
        </Label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          className={inputClass}
          {...describe("email")}
        />
        <FieldError name="email" error={errors.email} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="date">วันที่เข้าอยู่ / นัดดูห้อง</Label>
          <input
            id="date"
            name="date"
            type="date"
            min={minDate}
            defaultValue={values.date}
            className={inputClass}
            {...describe("date")}
          />
          <FieldError name="date" error={errors.date} />
        </div>
        <div>
          <Label htmlFor="occupants">จำนวนผู้พัก</Label>
          <input
            id="occupants"
            name="occupants"
            type="number"
            min={1}
            max={4}
            inputMode="numeric"
            defaultValue={values.occupants ?? "1"}
            className={inputClass}
            {...describe("occupants")}
          />
          <FieldError name="occupants" error={errors.occupants} />
        </div>
      </div>

      <div>
        <Label htmlFor="note" optional>
          หมายเหตุ / คำถามเพิ่มเติม
        </Label>
        <textarea
          id="note"
          name="note"
          rows={4}
          placeholder="เช่น อยากดูห้องช่วงเย็น หรือมีสัตว์เลี้ยง"
          defaultValue={values.note}
          className={inputClass}
          {...describe("note")}
        />
        <FieldError name="note" error={errors.note} />
      </div>

      {/* honeypot กันบอท: ซ่อนจากผู้ใช้จริง */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          เว็บไซต์
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-on-accent shadow-lg shadow-accent/25 transition-colors duration-200 hover:bg-accent-dark disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <>
            <span aria-hidden className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            กำลังส่ง…
          </>
        ) : (
          <>
            <PaperPlaneTilt size={20} weight="fill" aria-hidden />
            ส่งคำขอ
          </>
        )}
      </button>
      <p className="text-center text-xs text-muted-foreground">ยังไม่ต้องชำระเงิน เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยัน</p>
    </form>
  );
}
