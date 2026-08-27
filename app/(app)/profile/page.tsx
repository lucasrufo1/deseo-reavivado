"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, HeadphonesIcon, Copy, Check, X } from "lucide-react";

import { useSession } from "@/lib/session";
import { productConfig } from "@/config/product";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const email = useSession((s) => s.email);
  const logout = useSession((s) => s.logout);
  const [supportOpen, setSupportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(productConfig.supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Perfil</h1>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Correo electrónico
          </p>
          <p className="mt-1 break-all text-sm font-medium">
            {email ?? "—"}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setSupportOpen(true)}
          className="w-full"
        >
          <HeadphonesIcon className="h-4 w-4" aria-hidden="true" />
          Soporte
        </Button>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar sesión
        </Button>
      </div>

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

            <div className="flex items-center justify-between rounded-xl bg-primary-soft px-4 py-3">
              <span className="text-sm font-medium text-primary">
                {productConfig.supportEmail}
              </span>
              <button
                onClick={handleCopy}
                aria-label="Copiar email"
                className="ml-3 shrink-0 transition-transform active:scale-90"
              >
                {copied
                  ? <Check className="h-4 w-4 text-green-500" />
                  : <Copy className="h-4 w-4 text-primary" />
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
