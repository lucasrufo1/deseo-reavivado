/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats automatically (WebP on Chrome/Android, AVIF where supported).
    formats: ["image/avif", "image/webp"],
    // Declare the widths used in the app so Next.js generates only the needed sizes.
    deviceSizes: [375, 640, 750, 828, 1080, 1200],
    imageSizes: [32, 46, 64, 90, 128, 192, 256],
  },
};

module.exports = withPWA(nextConfig);
