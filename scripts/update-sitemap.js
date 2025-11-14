const fs = require('fs');
const path = require('path');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Path to sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Read the sitemap file
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Replace all lastmod dates with today's date
sitemap = sitemap.replace(
  /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
  `<lastmod>${today}</lastmod>`
);

// Write the updated sitemap back
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log(`✓ Sitemap updated with date: ${today}`);
