const fs = require('fs');
const path = require('path');

// Copy sitemap from public to build directory after build
const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
const buildSitemapPath = path.join(__dirname, '../build/sitemap.xml');

if (fs.existsSync(publicSitemapPath) && fs.existsSync(path.dirname(buildSitemapPath))) {
  fs.copyFileSync(publicSitemapPath, buildSitemapPath);
  console.log('✓ Sitemap copied to build directory');
} else {
  console.log('⚠ Build directory not found or sitemap missing');
}
