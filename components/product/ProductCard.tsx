import Link from "next/link";
import Image from "next/image";
import { Clock, Gift, RefreshCw } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  isBonus?: boolean;
  isLocked?: boolean;
  /** No cover, no link — renders an inert "En actualización" placeholder. */
  comingSoon?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  if (product.comingSoon) {
    return (
      <div
        aria-disabled="true"
        className="flex cursor-not-allowed flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground opacity-60"
      >
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
          <Clock className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm font-semibold">En actualización</span>
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold">{product.name}</h3>
        </div>
      </div>
    );
  }

  const inner = (
    <>
      <div className="relative aspect-square w-full bg-muted">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        )}
        {product.isLocked && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden pb-6 text-white"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--brand-primary) 70%, white) 0%, transparent 55%), linear-gradient(150deg, var(--brand-primary), color-mix(in srgb, var(--brand-primary) 45%, black))",
            }}
          >
            <Gift
              className="absolute -bottom-8 -right-8 h-24 w-24 -rotate-12 text-white/10"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
              <RefreshCw className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="relative text-xs font-medium tracking-wide text-white/90">
              En actualización
            </span>
          </div>
        )}
        {product.isBonus && (
          <span
            className={
              product.isLocked
                ? "absolute right-2 top-2 rounded-md border border-white/30 bg-black/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm"
                : "absolute right-2 top-2 rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-green-600 backdrop-blur-sm"
            }
          >
            Bono
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{product.name}</h3>
      </div>
    </>
  );

  const href = product.isLocked ? "/locked" : `/content/${product.id}`;

  return (
    <Link href={href} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-shadow hover:shadow-md">
      {inner}
    </Link>
  );
}
