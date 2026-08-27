import type { Metadata, Viewport } from "next";

import "./globals.css";
import { productConfig } from "@/config/product";

export const metadata: Metadata = {
  title: productConfig.appName,
  description: productConfig.description,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: productConfig.appShortName,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: productConfig.themeColor,
};

/**
 * Injects brand colors from productConfig into CSS variables so every component
 * can reference them via Tailwind tokens (bg-primary, text-primary-foreground…).
 * This is what keeps identity out of individual components.
 */
function brandThemeStyle() {
  const p = productConfig.primaryColor;
  return (
    `:root{` +
    `--brand-primary:${p};` +
    `--brand-accent:${productConfig.accentColor};` +
    // Derived tints used for highlighted affordances (icon chips, callout boxes,
    // outlined buttons). Deriving them here keeps every surface on-brand when
    // primaryColor changes — no component ever hardcodes a hex.
    `--brand-primary-soft:color-mix(in srgb, ${p} 14%, transparent);` +
    `--brand-primary-line:color-mix(in srgb, ${p} 35%, transparent);` +
    `}`
  );
}

/**
 * Captures the PWA `beforeinstallprompt` event as early as possible — before
 * React hydrates — and stashes it on window. The install hook reads it from
 * there, avoiding the race where the event fires before any component mounts.
 */
const PWA_CAPTURE_SCRIPT = `
(function(){
  window.__deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    window.__deferredInstallPrompt = e;
    window.dispatchEvent(new Event('deckapp:installable'));
  });
  window.addEventListener('appinstalled', function(){
    window.__deferredInstallPrompt = null;
    window.dispatchEvent(new Event('deckapp:installed'));
  });
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandThemeStyle() }} />
        <script dangerouslySetInnerHTML={{ __html: PWA_CAPTURE_SCRIPT }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
