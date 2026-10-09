// ข้อมูลห้องพักรายห้อง — แต่ละห้องมีเฟอร์นิเจอร์บิวท์อินไม่เหมือนกัน
// ตอนนี้ขนาด ราคา และรายการบิวท์อินเป็นข้อมูลตัวอย่าง กรุณาแก้เป็นข้อมูลจริงของแต่ละห้อง

export type Room = {
  code: string; // เลขห้อง เช่น "A1"
  floor: number;
  sizeSqm: number;
  pricePerMonth: number;
  deposit?: number; // ถ้าไม่ใส่ จะใช้เงินประกันเท่ากับค่าเช่า 1 เดือน
  maxOccupants: number;
  builtIns: string[]; // เฟอร์นิเจอร์บิวท์อินของห้องนี้
  highlight?: string; // จุดเด่นสั้นๆ เช่น "ห้องมุม"
  // ใส่ path รูปใน /public เช่น "/images/rooms/a1-1.jpg" — ถ้าเว้นว่างจะแสดงภาพตัวอย่างแทน
  images: string[];
};

export type Floor = {
  floor: number;
  name: string;
  note: string;
};

// สิ่งที่มีเหมือนกันทุกห้อง
export const standardFeatures = ["เครื่องปรับอากาศ", "เครื่องทำน้ำอุ่น", "ห้องน้ำในตัว", "Wi‑Fi ฟรี"];

export const floors: Floor[] = [
  { floor: 1, name: "ชั้น 1", note: "ไม่ต้องขึ้นบันได ใกล้ที่จอดรถ" },
  { floor: 2, name: "ชั้น 2", note: "เงียบสงบ ลมดี" },
  { floor: 3, name: "ชั้น 3", note: "ชั้นบนสุด วิวโปร่ง" },
];

export const rooms: Room[] = [
  // ชั้น 1
  { code: "A1", floor: 1, sizeSqm: 32, pricePerMonth: 5500, maxOccupants: 3, highlight: "ห้องมุม", builtIns: ["เตียง 6 ฟุต + ลิ้นชักใต้เตียง", "ตู้เสื้อผ้าบิวท์อินเต็มผนัง", "โต๊ะทำงานยาว", "เคาน์เตอร์แพนทรี"], images: [] },
  { code: "A2", floor: 1, sizeSqm: 24, pricePerMonth: 4300, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "โต๊ะทำงานติดผนัง"], images: [] },
  { code: "A3", floor: 1, sizeSqm: 24, pricePerMonth: 4300, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "โต๊ะเครื่องแป้ง"], images: [] },
  { code: "A4", floor: 1, sizeSqm: 26, pricePerMonth: 4500, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต + หัวเตียงชั้นวางของ", "ตู้เสื้อผ้าบานเลื่อน", "โต๊ะทำงานติดผนัง", "ชั้นวางทีวี"], images: [] },
  { code: "A5", floor: 1, sizeSqm: 24, pricePerMonth: 4300, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "ชั้นวางหนังสือ"], images: [] },
  { code: "A6", floor: 1, sizeSqm: 24, pricePerMonth: 4300, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "โต๊ะทำงานติดผนัง"], images: [] },
  { code: "A7", floor: 1, sizeSqm: 28, pricePerMonth: 4900, maxOccupants: 2, highlight: "ติดที่จอดรถ", builtIns: ["เตียง 5 ฟุต + ลิ้นชักใต้เตียง", "ตู้เสื้อผ้าบานเลื่อน", "โต๊ะทำงาน", "ตู้รองเท้า"], images: [] },
  // ชั้น 2
  { code: "B1", floor: 2, sizeSqm: 32, pricePerMonth: 5500, maxOccupants: 3, highlight: "ห้องมุม", builtIns: ["เตียง 6 ฟุต + ลิ้นชักใต้เตียง", "ตู้เสื้อผ้าบิวท์อินเต็มผนัง", "โซฟาบิวท์อิน", "เคาน์เตอร์แพนทรี"], images: [] },
  { code: "B2", floor: 2, sizeSqm: 24, pricePerMonth: 4500, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "โต๊ะทำงานติดผนัง"], images: [] },
  { code: "B3", floor: 2, sizeSqm: 26, pricePerMonth: 4700, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต + หัวเตียงชั้นวางของ", "ตู้เสื้อผ้าบานเลื่อน", "โต๊ะเครื่องแป้ง", "ชั้นวางทีวี"], images: [] },
  { code: "B4", floor: 2, sizeSqm: 24, pricePerMonth: 4500, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "ชั้นวางหนังสือ"], images: [] },
  { code: "B5", floor: 2, sizeSqm: 24, pricePerMonth: 4500, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "โต๊ะทำงานติดผนัง"], images: [] },
  { code: "B6", floor: 2, sizeSqm: 28, pricePerMonth: 5000, maxOccupants: 2, highlight: "ระเบียงกว้าง", builtIns: ["เตียง 5 ฟุต + ลิ้นชักใต้เตียง", "ตู้เสื้อผ้าบานเลื่อน", "โต๊ะทำงานยาว", "ชั้นวางทีวี"], images: [] },
  // ชั้น 3
  { code: "C1", floor: 3, sizeSqm: 32, pricePerMonth: 5600, maxOccupants: 3, highlight: "ห้องมุม วิวโปร่ง", builtIns: ["เตียง 6 ฟุต + ลิ้นชักใต้เตียง", "ตู้เสื้อผ้าบิวท์อินเต็มผนัง", "โต๊ะทำงานยาว", "เคาน์เตอร์แพนทรี"], images: [] },
  { code: "C2", floor: 3, sizeSqm: 24, pricePerMonth: 4600, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "โต๊ะทำงานติดผนัง"], images: [] },
  { code: "C3", floor: 3, sizeSqm: 26, pricePerMonth: 4800, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต + หัวเตียงชั้นวางของ", "ตู้เสื้อผ้าบานเลื่อน", "โต๊ะเครื่องแป้ง"], images: [] },
  { code: "C4", floor: 3, sizeSqm: 24, pricePerMonth: 4600, maxOccupants: 2, builtIns: ["เตียง 5 ฟุต", "ตู้เสื้อผ้าบิวท์อิน", "ชั้นวางหนังสือ"], images: [] },
  { code: "C5", floor: 3, sizeSqm: 28, pricePerMonth: 5100, maxOccupants: 2, highlight: "วิวโปร่ง", builtIns: ["เตียง 5 ฟุต + ลิ้นชักใต้เตียง", "ตู้เสื้อผ้าบานเลื่อน", "โต๊ะทำงานยาว", "ตู้รองเท้า"], images: [] },
];

export function roomsOnFloor(floor: number): Room[] {
  return rooms.filter((room) => room.floor === floor);
}

// รับได้ทั้ง "A1" และ "a1"
export function getRoom(code: string): Room | undefined {
  const normalized = code.toUpperCase();
  return rooms.find((room) => room.code === normalized);
}

export function roomPath(room: Room): string {
  return `/rooms/${room.code.toLowerCase()}`;
}

export function depositOf(room: Room): number {
  return room.deposit ?? room.pricePerMonth;
}

export const lowestPrice = Math.min(...rooms.map((room) => room.pricePerMonth));
