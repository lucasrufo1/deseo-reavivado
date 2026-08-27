import type { MetadataRoute } from "next";

import { productConfig } from "@/config/product";

/**
 * Config-driven PWA manifest. Next.js serves this at /manifest.webmanifest.
 * All identity values come from productConfig so nothing is hardcoded.
 *
 * A 512x512 icon must exist for the browser to consider the app installable
 * (otherwise `beforeinstallprompt` never fires and the install button stays
 * hidden). These are opaque on purpose: a transparent home-screen icon renders
 * against whatever the OS puts behind it. The maskable variant keeps the mark
 * inside the safe zone so Android's squircle crop never clips it.
 *
 * Icon roles: icon.webp = header mark, logo.* = full logo (login screen).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: productConfig.appName,
    short_name: productConfig.appShortName,
    description: productConfig.description,
    start_url: "/",
    display: "standalone",
    theme_color: productConfig.themeColor,
    background_color: productConfig.backgroundColor,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
