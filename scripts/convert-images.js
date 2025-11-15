const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// files to convert: relative to project root
const files = [
  "src/images/movie-theater/hifi.png",
  "src/images/vulns/vuln-hifi.png",
];

(async () => {
  for (const f of files) {
    try {
      const inPath = path.resolve(f);
      if (!fs.existsSync(inPath)) {
        console.warn("File not found, skipping:", inPath);
        continue;
      }
      const outPath = inPath.replace(/\.png$/i, ".webp");
      await sharp(inPath).webp({ quality: 80 }).toFile(outPath);
      console.log("Converted", inPath, "->", outPath);
    } catch (err) {
      console.error("Error converting", f, err);
    }
  }
})();
