import { cn } from "@/lib/utils";

/**
 * Logo placeholder — a rounded gray square.
 * Real products replace productConfig.logoUrl and can swap this for an <img>.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded-xl bg-muted", className)}
      role="img"
      aria-label="Logo do app"
    />
  );
}
