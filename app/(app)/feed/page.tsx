import { Banner } from "@/components/product/Banner";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/components/product/ProductCard";

const seccion1: Product[] = [
  { id: "1", name: "Protocolo Completo", imageUrl: "/icons/logo.webp" },
  { id: "2", name: "Bónus #1", imageUrl: "/images/bonus-1.webp", isBonus: true },
  { id: "3", name: "Bónus #2", imageUrl: "/images/bonus-2.webp", isBonus: true },
  { id: "4", name: "Bónus #3", imageUrl: "/images/bonus-3.webp", isBonus: true },
  { id: "5", name: "Bónus #4", imageUrl: "/images/bonus-4.webp", isBonus: true },
  { id: "10", name: "Contenido Complementario", imageUrl: "/images/lenguaje-adolescente.webp", isComplementary: true },
];

const seccion2: Product[] = [
  { id: "6", name: "Guía Completa", imageUrl: "/images/reset-atencion.webp" },
  { id: "7", name: "Bónus #1", imageUrl: "/images/bonus-5.webp", isBonus: true },
  { id: "8", name: "Bónus #2", imageUrl: "/images/bonus-6.webp", isBonus: true },
];

const seccion3: Product[] = [
  { id: "9", name: "Protocolo Completo", imageUrl: "/images/zero-berrinches.webp" },
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
        <SectionDivider title="Lenguaje de la Obediencia" />
        <ProductGrid products={seccion1} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionDivider title="Reset de Atención de 7 Días" />
        <ProductGrid products={seccion2} />
      </section>

      <section className="flex flex-col gap-4">
        <SectionDivider title="Protocolo Zero Berrinches" />
        <ProductGrid products={seccion3} />
      </section>
    </div>
  );
}
