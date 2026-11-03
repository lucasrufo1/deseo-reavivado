/**
 * generate-brand-assets.mjs
 * Builds every logo/icon variant from a single source logo (opaque, light background):
 *
 *   public/icons/logo.{png,webp}          full logo (mark + name), transparent, square canvas  -> login
 *   public/icons/icon.{png,webp}          isotype only, transparent, square canvas             -> header
 *   public/icons/icon-192.png             PWA icon (opaque)
 *   public/icons/icon-512.png             PWA icon (opaque)
 *   public/icons/icon-maskable-512.png    PWA maskable icon (opaque, mark kept inside safe zone)
 *
 * Usage: node scripts/generate-brand-assets.mjs "<source.png>" <isotypeBottomRow>
 *   <isotypeBottomRow> = last pixel row of the mark, just above the product name text.
 *
 * Background removal: flood-fill from the image border over near-white pixels (so light
 * highlights enclosed by the artwork survive), then "color to alpha" on a 2px edge ring
 * to keep antialiasing clean on any background.
 */

import sharp from "sharp";

const [, , SRC = "public/icons/MDR Logo.png", MARK_BOTTOM = "748"] = process.argv;
const OUT = "public/icons";
const PAGE_BG = { r: 255, g: 255, b: 255, alpha: 1 };

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const isBg = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  return Math.min(r, g, b) >= 236 && Math.max(r, g, b) - Math.min(r, g, b) <= 14;
};

// 1) Flood fill background from the border.
const bg = new Uint8Array(W * H);
const stack = [];
const seed = (x, y) => {
  const p = y * W + x;
  if (!bg[p] && isBg(p * 4)) { bg[p] = 1; stack.push(p); }
};
for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % W, y = (p / W) | 0;
  if (x > 0) seed(x - 1, y);
  if (x < W - 1) seed(x + 1, y);
  if (y > 0) seed(x, y - 1);
  if (y < H - 1) seed(x, y + 1);
}

// 1b) Below the mark there are only flat-colored letters, so near-white pixels there are
// letter counters (holes in D, e, o...) and can be cleared too. Above it, enclosed light
// pixels are glow/highlights of the artwork and must stay.
for (let y = Number(MARK_BOTTOM) + 1; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!bg[p] && isBg(p * 4)) bg[p] = 1;
  }
}

// 2) Edge ring = non-background pixels within 2px of background.
const ring = new Uint8Array(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (bg[p]) continue;
    outer: for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && bg[ny * W + nx]) { ring[p] = 1; break outer; }
      }
    }
  }
}

// 3) Write RGBA with transparency.
const out = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  const i = p * 4;
  if (bg[p]) continue; // stays 0,0,0,0
  let r = data[i], g = data[i + 1], b = data[i + 2], a = 255;
  if (ring[p]) {
    const alpha = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (alpha < 1) {
      const k = Math.max(alpha, 0.001);
      r = Math.round((r - 255 * (1 - k)) / k);
      g = Math.round((g - 255 * (1 - k)) / k);
      b = Math.round((b - 255 * (1 - k)) / k);
      a = Math.round(k * 255);
    }
  }
  out[i] = Math.max(0, Math.min(255, r));
  out[i + 1] = Math.max(0, Math.min(255, g));
  out[i + 2] = Math.max(0, Math.min(255, b));
  out[i + 3] = a;
}

/** Trim to content, pad to a transparent square canvas with `pad` fraction margin. */
async function squareTransparent(buf, pad = 0.06) {
  const trimmed = await sharp(buf).trim({ threshold: 1 }).png().toBuffer();
  const m = await sharp(trimmed).metadata();
  const side = Math.round(Math.max(m.width, m.height) * (1 + pad * 2));
  return sharp(trimmed)
    .extend({
      top: Math.floor((side - m.height) / 2),
      bottom: Math.ceil((side - m.height) / 2),
      left: Math.floor((side - m.width) / 2),
      right: Math.ceil((side - m.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

const markH = Number(MARK_BOTTOM) + 1;
// A copy: the full logo keeps everything (including the accent of "MÉTODO", which starts
// above the mark's last row), only the isotype gets cleaned.
const markRaw = Buffer.from(out.subarray(0, W * markH * 4));

// Drop small detached pieces from the isotype crop (here: the accent of the É poking in).
const MIN_COMPONENT = 400;
const seen = new Uint8Array(W * markH);
for (let start = 0; start < W * markH; start++) {
  if (seen[start] || markRaw[start * 4 + 3] <= 8) continue;
  const comp = [start];
  seen[start] = 1;
  for (let k = 0; k < comp.length; k++) {
    const p = comp[k];
    const x = p % W, y = (p / W) | 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= markH) continue;
        const q = ny * W + nx;
        if (!seen[q] && markRaw[q * 4 + 3] > 8) { seen[q] = 1; comp.push(q); }
      }
    }
  }
  if (comp.length < MIN_COMPONENT) {
    for (const p of comp) markRaw[p * 4 + 3] = 0;
    console.log(`  removed speck of ${comp.length}px near x=${comp[0] % W}, y=${(comp[0] / W) | 0}`);
  }
}
const fullPng = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const logoSquare = await squareTransparent(fullPng);
const markOnly = await sharp(markRaw, { raw: { width: W, height: markH, channels: 4 } }).png().toBuffer();
const iconSquare = await squareTransparent(markOnly, 0.04);

const save = async (buf, name, size) => {
  const img = () => sharp(buf).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  await img().png({ compressionLevel: 9 }).toFile(`${OUT}/${name}.png`);
  await img().webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}/${name}.webp`);
  console.log(`✓ ${name}.png / ${name}.webp  ${size}x${size}`);
};
await save(logoSquare, "logo", 512);
await save(iconSquare, "icon", 256);

// PWA icons: opaque, mark centered. `fill` = fraction of the canvas the mark's height may use.
async function pwaIcon(name, size, fill) {
  const mark = await sharp(iconSquare)
    .trim({ threshold: 1 })
    .resize({ height: Math.round(size * fill), width: Math.round(size * fill), fit: "inside" })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: PAGE_BG } })
    .composite([{ input: mark, gravity: "center" }])
    .flatten({ background: PAGE_BG })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/${name}.png`);
  console.log(`✓ ${name}.png  ${size}x${size} (opaque)`);
}
await pwaIcon("icon-192", 192, 0.74);
await pwaIcon("icon-512", 512, 0.74);
await pwaIcon("icon-maskable-512", 512, 0.56);
