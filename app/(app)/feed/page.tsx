import { productConfig } from "@/config/product";
import { Banner } from "@/components/product/Banner";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/components/product/ProductCard";

// Each product with content must have its id registered in config/content.ts.
// Bonuses are `isLocked`: the card shows the "En actualización" tag and opens /locked.
// TODO: replace the placeholder bonus names ("Bono 1", "Bono 2") and add their covers.
const seccion1: Product[] = [
  { id: "1", name: "Método", imageUrl: "/images/mdr-cover.webp" },
  { id: "3", name: "Bono 1", isBonus: true, isLocked: true },
  { id: "4", name: "Bono 2", isBonus: true, isLocked: true },
];

const seccion2: Product[] = [
  { id: "2", name: "Protocolo", imageUrl: "/images/pd7-cover.webp" },
  { id: "5", name: "Bono 1", isBonus: true, isLocked: true },
  { id: "6", name: "Bono 2", isBonus: true, isLocked: true },
];

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function FeedPage() {
  return (
    <div className="flex flex-col gap-8">
      <Banner />

      <section className="flex flex-col gap-4">
        <SectionDivider title={productConfig.appName} />
        <ProductGrid products={seccion1} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionDivider title="Protocolo Desbloqueo de 7 Días" />
        <ProductGrid products={seccion2} />
      </section>
    </div>
  );
}
