import type { Metadata, Viewport } from "next";
import Script from "next/script";

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
  return `:root{--brand-primary:${productConfig.primaryColor};--brand-accent:${productConfig.accentColor};}`;
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
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-N3PFN564FC" strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-N3PFN564FC');
      `}</Script>
      <Script id="clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "xg7drd3969");
      `}</Script>
    </html>
  );
}
