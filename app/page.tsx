"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/session";

/**
 * Entry route: waits for the persisted session to hydrate, then redirects to
 * /feed when authenticated or /login otherwise. Shows the loading spinner while deciding.
 */
export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useSession((s) => s.isAuthenticated);
  const hasHydrated = useSession((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    router.replace(isAuthenticated ? "/feed" : "/login");
  }, [hasHydrated, isAuthenticated, router]);

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </main>
  );
}
