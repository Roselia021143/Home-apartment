import type { Icon } from "@phosphor-icons/react";
import {
  Broom,
  Car,
  Drop,
  Garage,
  IdentificationCard,
  Snowflake,
  TShirt,
  WifiHigh,
} from "@phosphor-icons/react/ssr";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { dorm } from "@/data/dorm";

const icons: Record<(typeof dorm.amenities)[number]["icon"], Icon> = {
  keycard: IdentificationCard,
  remote: Garage,
  aircon: Snowflake,
  wifi: WifiHigh,
  parking: Car,
  laundry: TShirt,
  water: Drop,
  cleaning: Broom,
};

export default function AmenityList() {
  return (
    <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dorm.amenities.map((amenity) => {
        const AmenityIcon = icons[amenity.icon];
        return (
          <StaggerItem
            as="li"
            key={amenity.title}
            className="flex items-center gap-4 rounded-2xl bg-card p-5 ring-1 ring-primary/10"
          >
            <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <AmenityIcon size={26} weight="duotone" />
            </span>
            <div>
              <p className="font-semibold">{amenity.title}</p>
              <p className="text-sm text-muted-foreground">{amenity.detail}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
