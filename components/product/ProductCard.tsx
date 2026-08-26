import Link from "next/link";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  isBonus?: boolean;
  isLocked?: boolean;
  isComplementary?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
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
        {product.isBonus && (
          <span className="absolute right-2 top-2 rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-green-600 backdrop-blur-sm">
            Bónus
          </span>
        )}
        {product.isComplementary && (
          <span className="absolute right-2 top-2 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 backdrop-blur-sm">
            Complementario
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
