/**
 * convert-images.mjs
 * Converts all PNG images in public/images and public/icons to WebP.
 * Keeps the originals as fallback. Run with: node scripts/convert-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const DIRS = ["public/images", "public/icons"];
const QUALITY = 85;

let converted = 0;
let skipped = 0;
let saved = 0;

for (const dir of DIRS) {
  const files = await readdir(dir).catch(() => []);

  for (const file of files) {
    if (extname(file).toLowerCase() !== ".png") continue;

    const input = join(dir, file);
    const output = join(dir, basename(file, ".png") + ".webp");

    const { size: before } = await stat(input);

    await sharp(input)
      .webp({ quality: QUALITY })
      .toFile(output);

    const { size: after } = await stat(output);
    const reduction = (((before - after) / before) * 100).toFixed(1);
    saved += before - after;
    converted++;

    console.log(`✓ ${file} → ${basename(output)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${reduction}%)`);
  }
}

console.log(`\n${converted} converted, ${skipped} skipped. Total saved: ${(saved / 1024 / 1024).toFixed(2)}MB`);
