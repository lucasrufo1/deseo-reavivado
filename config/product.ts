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
  /** Path to the full logo (mark + name, transparent). Shown on the login screen. */
  logoUrl: string;
  /** Path to the isotype only (mark without name, transparent). Shown in the app header. */
  iconUrl: string;
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
  appName: "Método Deseo Reavivado",
  appShortName: "Deseo Reavivado",
  // TODO: replace with the final one-line description of the product.
  description: "Método Deseo Reavivado",
  primaryColor: "#C8063F",
  accentColor: "#FFFFFF",
  logoUrl: "/icons/logo.webp",
  iconUrl: "/icons/icon.webp",
  // TODO: banner is still the previous product's artwork — replace with the new one.
  bannerUrl: "/images/banner.webp",
  themeColor: "#6E0F1C",
  backgroundColor: "#ffffff",
  // TODO: placeholder — replace with the real support address.
  supportEmail: "soporte@example.com",
};
