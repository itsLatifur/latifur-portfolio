const fs = require("fs");
const path = require("path");

// Copy sitemap files from public to build directory after build
const publicSitemapPath = path.join(__dirname, "../public/sitemap.xml");
const buildSitemapPath = path.join(__dirname, "../build/sitemap.xml");

const publicImageSitemapPath = path.join(
  __dirname,
  "../public/image-sitemap.xml",
);
const buildImageSitemapPath = path.join(
  __dirname,
  "../build/image-sitemap.xml",
);

function copyIfExists(src, dest, label) {
  if (fs.existsSync(src) && fs.existsSync(path.dirname(dest))) {
    fs.copyFileSync(src, dest);
    console.log(`✓ ${label} copied to build directory`);
  } else {
    console.log(`⚠ ${label} missing or build directory not found`);
  }
}

copyIfExists(publicSitemapPath, buildSitemapPath, "Sitemap");
copyIfExists(publicImageSitemapPath, buildImageSitemapPath, "Image sitemap");
