import Image from "next/image";
import { productConfig } from "@/config/product";

export function Banner() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
      <Image
        src={productConfig.bannerUrl}
        alt="Banner"
        fill
        sizes="(max-width: 672px) 100vw, 672px"
        className="object-cover"
        priority
      />
    </div>
  );
}
