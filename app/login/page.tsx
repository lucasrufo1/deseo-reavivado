"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Download, Mail } from "lucide-react";

import { isValidEmail } from "@/lib/utils";
import { useSession } from "@/lib/session";
import { usePWAInstall } from "@/lib/usePWAInstall";
import { productConfig } from "@/config/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const login = useSession((s) => s.login);
  const { isInstallable, handleInstall } = usePWAInstall();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    setError(null);
    login(email);

    setShowSplash(true);
    setTimeout(() => {
      router.replace("/feed");
    }, 1500);
  }

  if (showSplash) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted px-6">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-background p-8 text-center shadow-md">
        {isInstallable && (
          <button
            onClick={handleInstall}
            className="mb-6 flex items-center gap-1.5 rounded-lg border border-primary-line bg-primary-soft px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-sm"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Instalar la app
          </button>
        )}

        <Image src={productConfig.logoUrl} alt={productConfig.appName} width={160} height={160} priority />

        <h1 className="mt-6 text-2xl font-bold">{productConfig.appName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Accede a tu cuenta</p>

        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                className="pl-9"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "email-error" : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
              />
            </div>
            {error && (
              <p id="email-error" role="alert" className="text-sm text-red-600">
                Ingresa un correo electrónico válido.
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Ingresar
          </Button>
        </form>
      </div>
    </main>
  );
}
