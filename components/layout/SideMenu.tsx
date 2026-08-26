"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut, Download, HeadphonesIcon, Copy, Check } from "lucide-react";

import { useSession } from "@/lib/session";
import { usePWAInstall } from "@/lib/usePWAInstall";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "@/components/layout/nav-items";
import { productConfig } from "@/config/product";

const SUPPORT_EMAIL = "contacto@lenguajeobediencia.online";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Slide-in drawer for secondary navigation. Dismissed by scrim or close button. */
export function SideMenu({ open, onClose }: SideMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useSession((s) => s.logout);
  const { isInstallable, handleInstall } = usePWAInstall();
  const [supportOpen, setSupportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleLogout() {
    onClose();
    logout();
    router.replace("/login");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 max-w-[80%] flex-col bg-background shadow-xl transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="text-base font-semibold">
            {productConfig.appName}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto p-2" aria-label="Menú lateral">
          {isInstallable && (
            <button
              onClick={handleInstall}
              className="mb-2 flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Instalar la app
            </button>
          )}

          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => {
              const firstMatchIndex = navItems.findIndex((n) => n.href === pathname);
              const isActive = pathname === item.href && index === firstMatchIndex;
              const Icon = item.icon;
              return (
                <li key={`${item.href}-${index}`}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors",
                      isActive
                        ? "bg-muted font-semibold text-primary"
                        : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto border-t border-border pt-2">
            <button
              onClick={() => setSupportOpen(true)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <HeadphonesIcon className="h-5 w-5" aria-hidden="true" />
              Soporte
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-muted"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Cerrar sesión
            </button>
          </div>
        </nav>
      </aside>

      {/* Support modal */}
      {supportOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
          onClick={() => setSupportOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Soporte</h2>
              <button onClick={() => setSupportOpen(false)} aria-label="Cerrar">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              ¿Tienes alguna duda o problema? Escríbenos al correo y te responderemos a la brevedad.
            </p>

            <div
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ backgroundColor: "color-mix(in srgb, #F2B705 12%, transparent)" }}
            >
              <span className="text-sm font-medium" style={{ color: "#B38600" }}>
                {SUPPORT_EMAIL}
              </span>
              <button
                onClick={handleCopy}
                aria-label="Copiar email"
                className="ml-3 shrink-0 transition-transform active:scale-90"
              >
                {copied
                  ? <Check className="h-4 w-4 text-green-500" />
                  : <Copy className="h-4 w-4" style={{ color: "#B38600" }} />
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
