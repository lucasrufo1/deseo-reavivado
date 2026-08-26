import { Clock } from "lucide-react";
import Link from "next/link";

export default function LockedPage() {
  return (
    <div className="flex min-h-[calc(100dvh-10rem)] flex-col items-center justify-center px-6 text-center">
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "color-mix(in srgb, #F2B705 15%, transparent)" }}
      >
        <Clock className="h-8 w-8" style={{ color: "#B38600" }} />
      </div>

      <h1 className="text-xl font-bold">Contenido en actualización</h1>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Este material está siendo actualizado. Estará disponible en un plazo de <strong>24 horas</strong>.
      </p>

      <Link
        href="/feed"
        className="mt-8 text-sm font-semibold"
        style={{ color: "#B38600" }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
