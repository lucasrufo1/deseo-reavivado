"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/session";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideMenu } from "@/components/layout/SideMenu";
import { Logo } from "@/components/layout/Logo";

/**
 * Protected shell. Guards every /(app) route: once the session has hydrated,
 * unauthenticated users are redirected to /login. Renders the persistent
 * Header + BottomNav + SideMenu around page content.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useSession((s) => s.isAuthenticated);
  const hasHydrated = useSession((s) => s.hasHydrated);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Avoid flashing protected content before hydration / during redirect.
  if (!hasHydrated || !isAuthenticated) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Cargando materiales...</p>
      </main>
    );
  }

  return (
    <div className="min-h-dvh">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* pb reserves space so the fixed BottomNav never overlaps content. */}
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-4">{children}</main>

      <BottomNav />
    </div>
  );
}
