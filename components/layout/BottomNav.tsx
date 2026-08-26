"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/components/layout/nav-items";

/**
 * Fixed bottom navigation. The active route is highlighted by color + weight.
 * Inner layout reserves bottom padding so content is never hidden behind it.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegación principal"
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around">
        {navItems.map((item, index) => {
          // Only the first item whose href matches is marked active,
          // preventing duplicates when two items share the same route.
          const firstMatchIndex = navItems.findIndex((n) => n.href === pathname);
          const isActive = pathname === item.href && index === firstMatchIndex;
          const Icon = item.icon;
          return (
            <li key={`${item.href}-${index}`} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors",
                  isActive
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
