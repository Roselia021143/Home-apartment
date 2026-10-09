import Image from "next/image";
import { ImageSquare } from "@phosphor-icons/react/ssr";

type PhotoProps = {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// แสดงรูปจริงถ้ามี src ไม่เช่นนั้นแสดงกรอบภาพตัวอย่างพร้อมคำบรรยาย
export default function Photo({ src, alt, className = "", priority, sizes = "100vw" }: PhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center bg-linear-to-br from-[#ccfbf1] via-[#e0f2fe] to-[#f0fdfa] text-center"
        >
          <div className="px-4 text-primary/70">
            <ImageSquare size={40} aria-hidden className="mx-auto" />
            <span className="mt-2 block text-sm font-medium">{alt}</span>
            <span className="block text-xs text-muted-foreground">ภาพตัวอย่าง</span>
          </div>
        </div>
      )}
    </div>
  );
}
