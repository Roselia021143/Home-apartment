// ข้อมูลทั่วไปของหอพัก (ข้อมูลรายห้องอยู่ใน src/data/rooms.ts)
// ตอนนี้เป็นข้อมูลตัวอย่าง กรุณาเปลี่ยนเป็นข้อมูลจริงของหอพัก

export type Faq = { question: string; answer: string };

export const dorm = {
  name: "Home อพาร์ทเมนท์",
  shortName: "Home อพาร์ทเมนท์",
  slogan: "หอพักสะอาด ปลอดภัย ใกล้มหาวิทยาลัย อยู่สบายเหมือนอยู่บ้าน",
  description:
    "หอพักบรรยากาศอบอุ่น เดินทางสะดวก ห้องแอร์ทุกห้อง เข้า-ออกด้วยคีย์การ์ดและรีโมทประตู มีที่จอดรถฟรี เหมาะสำหรับนักศึกษาและคนทำงาน",
  siteUrl: "https://home-apartment.vercel.app",

  contact: {
    phone: "081-234-5678",
    lineId: "@homeapartment",
    lineUrl: "https://line.me/R/ti/p/@homeapartment",
    email: "contact@example.com",
    officeHours: "ทุกวัน 08:00 – 20:00 น.",
  },

  address: {
    line: "123/45 ถนนตัวอย่าง ตำบลตัวอย่าง อำเภอเมือง จังหวัดตัวอย่าง 10000",
    nearby: [
      "มหาวิทยาลัยตัวอย่าง – 5 นาที",
      "ร้านสะดวกซื้อ – เดิน 1 นาที",
      "ตลาดนัด – 3 นาที",
      "ป้ายรถเมล์ – หน้าหอ",
    ],
    // ลิงก์ฝังแผนที่: เปิด Google Maps → แชร์ → ฝังแผนที่ → คัดลอกค่า src มาใส่
    mapEmbedUrl:
      "https://www.google.com/maps?q=13.7563,100.5018&z=16&output=embed",
    mapLinkUrl: "https://maps.google.com/?q=13.7563,100.5018",
  },

  utilities: {
    waterPerUnit: 18,
    electricityPerUnit: 7,
    internet: "Wi‑Fi ฟรีทุกห้อง",
    contractMonths: 6,
  },

  // ข้อมูลห้องรายห้องอยู่ใน src/data/rooms.ts

  // icon ที่ใช้ได้: keycard, remote, aircon, wifi, parking, laundry, water, cleaning (ดู src/components/AmenityList.tsx)
  amenities: [
    { icon: "parking", title: "ที่จอดรถฟรี", detail: "สำหรับผู้เช่าทุกห้อง" },
    { icon: "remote", title: "รีโมทเปิดประตู", detail: "เข้า-ออกอาคารสะดวก" },
    { icon: "keycard", title: "คีย์การ์ด", detail: "เฉพาะผู้เช่าเท่านั้น" },
    { icon: "aircon", title: "ห้องแอร์ทุกห้อง", detail: "18 ห้อง 3 ชั้น" },
    { icon: "wifi", title: "Wi‑Fi ความเร็วสูง", detail: "ฟรีทุกห้อง" },
    { icon: "laundry", title: "เครื่องซักผ้าหยอดเหรียญ", detail: "ชั้น 1" },
    { icon: "water", title: "ตู้น้ำดื่ม", detail: "ทุกชั้น" },
    { icon: "cleaning", title: "แม่บ้านทำความสะอาด", detail: "พื้นที่ส่วนกลางทุกวัน" },
  ] as const,

  // จุดเด่นสั้นๆ ที่แสดงใต้ Hero
  highlights: [
    { value: "แอร์ทุกห้อง", label: "18 ห้อง 3 ชั้น" },
    { value: "จอดรถฟรี", label: "สำหรับผู้เช่า" },
    { value: "คีย์การ์ด", label: "+ รีโมทเปิดประตู" },
  ],

  gallery: [
    { src: "", caption: "ด้านหน้าอาคาร" },
    { src: "", caption: "ห้องแอร์" },
    { src: "", caption: "ห้องน้ำ" },
    { src: "", caption: "ที่จอดรถ" },
    { src: "", caption: "โถงทางเข้า" },
    { src: "", caption: "ระเบียง" },
  ],

  rules: [
    "ทำสัญญาขั้นต่ำ 6 เดือน",
    "ชำระค่าเช่าภายในวันที่ 5 ของทุกเดือน",
    "ห้ามสูบบุหรี่ภายในห้องพัก",
    "งดใช้เสียงดังหลัง 22:00 น.",
    "เลี้ยงสัตว์ได้เฉพาะสัตว์เลี้ยงขนาดเล็กตามข้อตกลง",
  ],

  faqs: [
    {
      question: "ต้องจ่ายอะไรบ้างในวันเข้าอยู่?",
      answer: "ค่าเช่าเดือนแรก + เงินประกันเท่ากับค่าเช่า 1 เดือน (ได้คืนเมื่อย้ายออกหากไม่มีความเสียหาย)",
    },
    {
      question: "ค่าน้ำค่าไฟคิดอย่างไร?",
      answer: "ค่าน้ำหน่วยละ 18 บาท ค่าไฟหน่วยละ 7 บาท ตามมิเตอร์จริงของแต่ละห้อง",
    },
    {
      question: "มีที่จอดรถไหม? เสียค่าใช้จ่ายหรือเปล่า?",
      answer: "มีที่จอดรถให้ผู้เช่าฟรี และผู้เช่าทุกคนจะได้รับรีโมทเปิดประตูและคีย์การ์ดสำหรับเข้า-ออกอาคาร",
    },
    {
      question: "นัดดูห้องได้ไหม?",
      answer: "ได้ครับ กรอกฟอร์มจองและเลือก “นัดดูห้อง” หรือโทร/แอด LINE มาได้เลย",
    },
    {
      question: "จองแล้วต้องทำอะไรต่อ?",
      answer: "เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมงเพื่อยืนยันห้องและแจ้งรายละเอียดการชำระเงิน",
    },
  ] satisfies Faq[],
};

export function formatBaht(amount: number): string {
  return amount.toLocaleString("th-TH");
}
