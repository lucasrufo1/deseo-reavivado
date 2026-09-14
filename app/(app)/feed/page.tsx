import { productConfig } from "@/config/product";
import { Banner } from "@/components/product/Banner";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/components/product/ProductCard";

const seccion1: Product[] = [
  { id: "1", name: "Guia Completo", imageUrl: "/icons/logo.webp" },
  { id: "2", name: "Tu Primera Cita con Intención", imageUrl: "/images/guia-primera-cita.webp", isBonus: true },
  { id: "3", name: "Oración que Declara", imageUrl: "/images/oracion-futuro-esposo.webp", isBonus: true },
  { id: "4", name: "Tu Presencia Online, Tu Posicionamiento Real", imageUrl: "/images/del-feed-al-altar.webp", isBonus: true },
  { id: "5", name: "Diagnóstico de la Promesa", imageUrl: "/images/diagnostico-de-la-promesa.webp", isBonus: true },
  { id: "7", name: "Lo Que Él Dice y Lo Que Realmente Busca", imageUrl: "/images/mente-masculina.webp", isBonus: true },
];

const seccion2: Product[] = [
  { id: "6", name: "Guia Completo", imageUrl: "/images/sosteniendo-la-promesa.webp" },
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
        <SectionDivider title="Sosteniendo la Promesa" />
        <ProductGrid products={seccion2} />
      </section>
    </div>
  );
}
