import { z } from "zod";
import { getRoom, rooms } from "@/data/rooms";

export const requestTypes = {
  booking: "จองห้อง",
  visit: "นัดดูห้อง",
} as const;

const roomCodes = rooms.map((room) => room.code) as [string, ...string[]];

// วันที่ปัจจุบันตามเวลาประเทศไทย ในรูปแบบ YYYY-MM-DD
export function todayInBangkok(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
}

export const bookingSchema = z.object({
  name: z.string().trim().min(2, { error: "กรุณากรอกชื่อ-นามสกุล" }).max(100, { error: "ชื่อยาวเกินไป" }),
  phone: z
    .string()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^0\d{8,9}$/, { error: "เบอร์โทรไม่ถูกต้อง (เช่น 081-234-5678)" })),
  lineId: z.string().trim().max(50, { error: "LINE ID ยาวเกินไป" }),
  email: z.union([z.literal(""), z.email({ error: "รูปแบบอีเมลไม่ถูกต้อง" })]),
  room: z
    .string()
    .transform((value) => value.trim().toUpperCase())
    .pipe(z.enum(roomCodes, { error: "กรุณาเลือกห้อง" })),
  requestType: z.enum(Object.keys(requestTypes) as [keyof typeof requestTypes], {
    error: "กรุณาเลือกประเภทคำขอ",
  }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "กรุณาเลือกวันที่" })
    .refine((value) => value >= todayInBangkok(), { error: "กรุณาเลือกวันที่ตั้งแต่วันนี้เป็นต้นไป" }),
  occupants: z.coerce
    .number({ error: "กรุณาระบุจำนวนผู้พัก" })
    .int()
    .min(1, { error: "อย่างน้อย 1 คน" })
    .max(4, { error: "ไม่เกิน 4 คน" }),
  note: z.string().trim().max(1000, { error: "ข้อความยาวเกินไป (ไม่เกิน 1,000 ตัวอักษร)" }),
}).superRefine((request, ctx) => {
  const room = getRoom(request.room);
  if (room && request.occupants > room.maxOccupants) {
    ctx.addIssue({
      code: "custom",
      path: ["occupants"],
      message: `ห้อง ${room.code} พักได้ไม่เกิน ${room.maxOccupants} คน`,
    });
  }
});

export type BookingRequest = z.infer<typeof bookingSchema>;
export type BookingField = keyof BookingRequest;

export type BookingFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<BookingField, string>>;
  values?: Partial<Record<BookingField, string>>;
  submissionId: number;
};
