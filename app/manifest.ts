import type { MetadataRoute } from "next";

import { productConfig } from "@/config/product";

/**
 * Config-driven PWA manifest. Next.js serves this at /manifest.webmanifest.
 * All identity values come from productConfig so nothing is hardcoded.
 *
 * The icon (/public/icons/icon.png) must exist and be at least 512x512 for the
 * browser to consider the app installable (otherwise `beforeinstallprompt` never
 * fires and the install button stays hidden).
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
        src: "/icons/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
