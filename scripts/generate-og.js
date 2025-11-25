const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

(async () => {
  try {
    const PUBLIC = path.join(__dirname, "..", "public");
    const src = path.join(PUBLIC, "latifur-rahman-limon.webp");
    const outJpg = path.join(PUBLIC, "og-image.jpg");
    const outPng = path.join(PUBLIC, "og-image.png");

    if (!fs.existsSync(src)) {
      console.error("Source image not found:", src);
      process.exit(2);
    }

    const width = 1200;
    const height = 630;

    // Background color for letterboxing. Set env var OG_BG to 'white' or a hex color (e.g. '#000000').
    const OG_BG = process.env.OG_BG || "#000000";
    const background = OG_BG.toLowerCase() === "white" ? "#ffffff" : OG_BG;

    // Simple SVG overlay with a translucent band and text
    const svgOverlay = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { fill: #ffffff; font-size: 48px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
      .subtitle { fill: #ffffff; font-size: 28px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
    </style>
  </defs>
  <rect x="0" y="${height - 170}" width="${width}" height="170" fill="rgba(0,0,0,0.55)" />
  <text x="60" y="${height - 90}" class="title">Latifur Rahman Limon</text>
  <text x="60" y="${height - 40}" class="subtitle">Software Engineer · .NET &amp; React</text>
</svg>`;

    const svgBuffer = Buffer.from(svgOverlay);

    console.log("Generating OG images from", src);

    // Generate JPEG using "contain" so the image is not cropped; letterbox with background color.
    await sharp(src)
      .resize(width, height, { fit: "contain", background, position: "centre" })
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .jpeg({ quality: 90 })
      .toFile(outJpg);

    console.log("Saved", outJpg);

    // Generate PNG (lossless-ish) using same contain + background approach
    await sharp(src)
      .resize(width, height, { fit: "contain", background, position: "centre" })
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .png({ compressionLevel: 6 })
      .toFile(outPng);

    console.log("Saved", outPng);
    console.log("OG images generated successfully.");
  } catch (err) {
    console.error("Error generating OG images:", err);
    process.exit(1);
  }
})();
