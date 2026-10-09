"use server";

import { Resend } from "resend";
import { z } from "zod";
import { dorm, formatBaht } from "@/data/dorm";
import { getRoom } from "@/data/rooms";
import {
  bookingSchema,
  requestTypes,
  type BookingField,
  type BookingFormState,
  type BookingRequest,
} from "@/lib/booking";

const formFields: BookingField[] = [
  "name",
  "phone",
  "lineId",
  "email",
  "room",
  "requestType",
  "date",
  "occupants",
  "note",
];

function formatEmail(request: BookingRequest): string {
  const room = getRoom(request.room);
  const date = new Date(`${request.date}T00:00:00`).toLocaleDateString("th-TH", {
    dateStyle: "long",
  });
  return [
    `มีคำขอ${requestTypes[request.requestType]}ใหม่จากเว็บไซต์ ${dorm.name}`,
    "",
    `ประเภทคำขอ: ${requestTypes[request.requestType]}`,
    `ชื่อ-นามสกุล: ${request.name}`,
    `เบอร์โทร: ${request.phone}`,
    `LINE ID: ${request.lineId || "-"}`,
    `อีเมล: ${request.email || "-"}`,
    room
      ? `ห้อง: ${room.code} (ชั้น ${room.floor}, ${room.sizeSqm} ตร.ม., ฿${formatBaht(room.pricePerMonth)}/เดือน)`
      : `ห้อง: ${request.room}`,
    `${request.requestType === "visit" ? "วันที่นัดดูห้อง" : "วันที่ต้องการเข้าอยู่"}: ${date}`,
    `จำนวนผู้พัก: ${request.occupants} คน`,
    `หมายเหตุ: ${request.note || "-"}`,
  ].join("\n");
}

export async function submitBooking(
  previous: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const submissionId = previous.submissionId + 1;

  // ช่อง honeypot: คนจริงมองไม่เห็นช่องนี้ ถ้ามีค่าแปลว่าเป็นบอท — ตอบว่าสำเร็จแต่ไม่ส่งอะไร
  if (formData.get("website")) {
    return { status: "success", submissionId };
  }

  const values = Object.fromEntries(
    formFields.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<BookingField, string>;

  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      message: "กรุณาตรวจสอบข้อมูลที่กรอกอีกครั้ง",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ),
      values,
      submissionId,
    };
  }

  const request = parsed.data;
  const subject = `คำขอ${requestTypes[request.requestType]}ใหม่ – ${request.name}`;
  const text = formatEmail(request);

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !ownerEmail) {
    // ยังไม่ได้ตั้งค่าการส่งอีเมล (เช่น ตอนพัฒนาในเครื่อง) — แสดงข้อมูลใน console แทน
    console.info(`[booking] ยังไม่ได้ตั้งค่า RESEND_API_KEY/OWNER_EMAIL จึงไม่ได้ส่งอีเมล\n${subject}\n${text}`);
    return { status: "success", submissionId };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || `${dorm.name} <onboarding@resend.dev>`,
      to: ownerEmail,
      replyTo: request.email || undefined,
      subject,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[booking] ส่งอีเมลไม่สำเร็จ", error);
    return {
      status: "error",
      message: `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือโทร ${dorm.contact.phone}`,
      values,
      submissionId,
    };
  }

  return { status: "success", submissionId };
}
