/**
 * product.ts — Per-instance configuration (the ONLY file that changes between products).
 *
 * DeckApp is a base shell ("engine"). Each product built from it is a different
 * "vehicle" using the same engine. All visual identity, naming and content that
 * differs per product lives here. No other file should hardcode a product name,
 * color, logo or banner.
 *
 * See docs/HOW_TO_CREATE_A_PRODUCT.md for the full guide.
 */

export interface ProductConfig {
  /** Full app name, shown as the H1 on login and in metadata. */
  appName: string;
  /** Short name used by the PWA manifest (home-screen label). */
  appShortName: string;
  /** One-line description used in metadata and the manifest. */
  description: string;
  /** Brand primary color (any valid CSS color). Drives buttons, links, etc. */
  primaryColor: string;
  /** Brand accent / "on primary" color (text/icons placed over primary). */
  accentColor: string;
  /** Path to the product logo (place the file under /public). */
  logoUrl: string;
  /** Path to the feed banner image (place the file under /public). */
  bannerUrl: string;
  /** PWA theme color (browser UI / status bar). */
  themeColor: string;
  /** PWA splash/background color. */
  backgroundColor: string;
  /** Support contact shown in Profile and the side menu. */
  supportEmail: string;
}

export const productConfig: ProductConfig = {
  appName: "Guía de la Prometida",
  appShortName: "La Prometida",
  description: "De la espera al altar",
  primaryColor: "#8C1D3A",
  accentColor: "#FFFFFF",
  logoUrl: "/icons/logo.webp",
  bannerUrl: "/images/banner.webp",
  themeColor: "#480818",
  backgroundColor: "#ffffff",
  supportEmail: "soporte@laprometida.online",
};
