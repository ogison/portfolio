import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const appDir = join(__dirname, '..', 'src', 'app');

// NES-style "O" icon with pixel art aesthetic
// Using Nintendo red (#e60012) on dark background (#1a1a1a)
// with pixel border style
const createIconSVG = (size) => {
  const pixelSize = size / 32;

  // Design a 32x32 pixel grid icon
  // Stylized "O" with retro game aesthetic and pixel border
  const pixels = [
    // Background is dark, we'll draw the design
    // Outer pixel border (Nintendo red)
    ...generateBorder(0, 0, 32, 32, '#e60012'),
    // Inner pixel border
    ...generateBorder(2, 2, 28, 28, '#e60012'),

    // Stylized "O" letter in center (white/cream color for contrast)
    // Top of O
    { x: 11, y: 8, color: '#f5f5f5' },
    { x: 12, y: 8, color: '#f5f5f5' },
    { x: 13, y: 8, color: '#f5f5f5' },
    { x: 14, y: 8, color: '#f5f5f5' },
    { x: 15, y: 8, color: '#f5f5f5' },
    { x: 16, y: 8, color: '#f5f5f5' },
    { x: 17, y: 8, color: '#f5f5f5' },
    { x: 18, y: 8, color: '#f5f5f5' },
    { x: 19, y: 8, color: '#f5f5f5' },
    { x: 20, y: 8, color: '#f5f5f5' },

    // Second row of top
    { x: 10, y: 9, color: '#f5f5f5' },
    { x: 11, y: 9, color: '#f5f5f5' },
    { x: 20, y: 9, color: '#f5f5f5' },
    { x: 21, y: 9, color: '#f5f5f5' },

    // Left side of O
    { x: 9, y: 10, color: '#f5f5f5' },
    { x: 10, y: 10, color: '#f5f5f5' },
    { x: 9, y: 11, color: '#f5f5f5' },
    { x: 10, y: 11, color: '#f5f5f5' },
    { x: 9, y: 12, color: '#f5f5f5' },
    { x: 10, y: 12, color: '#f5f5f5' },
    { x: 9, y: 13, color: '#f5f5f5' },
    { x: 10, y: 13, color: '#f5f5f5' },
    { x: 9, y: 14, color: '#f5f5f5' },
    { x: 10, y: 14, color: '#f5f5f5' },
    { x: 9, y: 15, color: '#f5f5f5' },
    { x: 10, y: 15, color: '#f5f5f5' },
    { x: 9, y: 16, color: '#f5f5f5' },
    { x: 10, y: 16, color: '#f5f5f5' },
    { x: 9, y: 17, color: '#f5f5f5' },
    { x: 10, y: 17, color: '#f5f5f5' },
    { x: 9, y: 18, color: '#f5f5f5' },
    { x: 10, y: 18, color: '#f5f5f5' },
    { x: 9, y: 19, color: '#f5f5f5' },
    { x: 10, y: 19, color: '#f5f5f5' },
    { x: 9, y: 20, color: '#f5f5f5' },
    { x: 10, y: 20, color: '#f5f5f5' },
    { x: 9, y: 21, color: '#f5f5f5' },
    { x: 10, y: 21, color: '#f5f5f5' },

    // Right side of O
    { x: 21, y: 10, color: '#f5f5f5' },
    { x: 22, y: 10, color: '#f5f5f5' },
    { x: 21, y: 11, color: '#f5f5f5' },
    { x: 22, y: 11, color: '#f5f5f5' },
    { x: 21, y: 12, color: '#f5f5f5' },
    { x: 22, y: 12, color: '#f5f5f5' },
    { x: 21, y: 13, color: '#f5f5f5' },
    { x: 22, y: 13, color: '#f5f5f5' },
    { x: 21, y: 14, color: '#f5f5f5' },
    { x: 22, y: 14, color: '#f5f5f5' },
    { x: 21, y: 15, color: '#f5f5f5' },
    { x: 22, y: 15, color: '#f5f5f5' },
    { x: 21, y: 16, color: '#f5f5f5' },
    { x: 22, y: 16, color: '#f5f5f5' },
    { x: 21, y: 17, color: '#f5f5f5' },
    { x: 22, y: 17, color: '#f5f5f5' },
    { x: 21, y: 18, color: '#f5f5f5' },
    { x: 22, y: 18, color: '#f5f5f5' },
    { x: 21, y: 19, color: '#f5f5f5' },
    { x: 22, y: 19, color: '#f5f5f5' },
    { x: 21, y: 20, color: '#f5f5f5' },
    { x: 22, y: 20, color: '#f5f5f5' },
    { x: 21, y: 21, color: '#f5f5f5' },
    { x: 22, y: 21, color: '#f5f5f5' },

    // Bottom row transition
    { x: 10, y: 22, color: '#f5f5f5' },
    { x: 11, y: 22, color: '#f5f5f5' },
    { x: 20, y: 22, color: '#f5f5f5' },
    { x: 21, y: 22, color: '#f5f5f5' },

    // Bottom of O
    { x: 11, y: 23, color: '#f5f5f5' },
    { x: 12, y: 23, color: '#f5f5f5' },
    { x: 13, y: 23, color: '#f5f5f5' },
    { x: 14, y: 23, color: '#f5f5f5' },
    { x: 15, y: 23, color: '#f5f5f5' },
    { x: 16, y: 23, color: '#f5f5f5' },
    { x: 17, y: 23, color: '#f5f5f5' },
    { x: 18, y: 23, color: '#f5f5f5' },
    { x: 19, y: 23, color: '#f5f5f5' },
    { x: 20, y: 23, color: '#f5f5f5' },
  ];

  const rects = pixels.map(p =>
    `<rect x="${p.x * pixelSize}" y="${p.y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${p.color}"/>`
  ).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#000000"/>
  ${rects}
</svg>`;
};

// Generate pixel border
function generateBorder(x, y, width, height, color) {
  const pixels = [];
  // Top edge
  for (let i = x; i < x + width; i++) {
    pixels.push({ x: i, y: y, color });
  }
  // Bottom edge
  for (let i = x; i < x + width; i++) {
    pixels.push({ x: i, y: y + height - 1, color });
  }
  // Left edge (excluding corners)
  for (let j = y + 1; j < y + height - 1; j++) {
    pixels.push({ x: x, y: j, color });
  }
  // Right edge (excluding corners)
  for (let j = y + 1; j < y + height - 1; j++) {
    pixels.push({ x: x + width - 1, y: j, color });
  }
  return pixels;
}

async function generateIcons() {
  console.log('Generating NES-style icons...');

  // Generate different sizes
  const sizes = [
    { name: 'favicon', size: 32, path: join(appDir, 'favicon.ico') },
    { name: 'icon-192', size: 192, path: join(publicDir, 'icon-192.png') },
    { name: 'icon-512', size: 512, path: join(publicDir, 'icon-512.png') },
    { name: 'apple-touch-icon', size: 180, path: join(publicDir, 'apple-touch-icon.png') },
  ];

  for (const { name, size, path } of sizes) {
    console.log(`Creating ${name} (${size}x${size})...`);
    const svg = createIconSVG(size);

    // Save SVG for debugging (optional)
    if (name === 'icon-512') {
      writeFileSync(join(publicDir, 'icon.svg'), svg);
    }

    // Convert to PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    if (name === 'favicon') {
      // For favicon, create a 32x32 PNG and save as ico
      // Sharp doesn't directly support .ico, but modern browsers support PNG favicons
      // We'll save as PNG with .ico extension (works in modern browsers)
      // Or create a proper favicon using the PNG
      const favicon16 = await sharp(Buffer.from(createIconSVG(16)))
        .png()
        .toBuffer();
      const favicon32 = await sharp(Buffer.from(createIconSVG(32)))
        .png()
        .toBuffer();

      // Save as PNG with ico extension (modern browsers support this)
      writeFileSync(path, favicon32);

      // Also save a proper favicon.png in app directory for Next.js
      writeFileSync(join(appDir, 'icon.png'), favicon32);
    } else {
      writeFileSync(path, pngBuffer);
    }

    console.log(`  ✓ ${name} created`);
  }

  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
