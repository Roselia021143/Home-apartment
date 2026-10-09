import Photo from "@/components/Photo";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { dorm } from "@/data/dorm";

// ตาราง bento สำหรับรูป 6 รูป: รูปแรกใหญ่ 2×2 รูปที่ 4–6 กว้าง 2 ช่องบนจอใหญ่ เพื่อให้เต็มตารางพอดี
export default function Gallery() {
  return (
    <Stagger as="ul" className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4">
      {dorm.gallery.map((item, index) => (
        <StaggerItem
          as="li"
          key={item.caption}
          className={
            index === 0
              ? "col-span-2 row-span-2"
              : index === 5
                ? "col-span-2"
                : index >= 3
                  ? "md:col-span-2"
                  : ""
          }
        >
          <figure className="relative h-full overflow-hidden rounded-2xl">
            <Photo
              src={item.src || undefined}
              alt={item.caption}
              className="h-full"
              sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
            />
            {item.src && (
              <figcaption className="glass absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs font-medium">
                {item.caption}
              </figcaption>
            )}
          </figure>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
