const fs = require("fs");
const path = require("path");

// Path to sitemap
const sitemapPath = path.join(__dirname, "../public/sitemap.xml");
const backupPath = path.join(
  __dirname,
  `../public/sitemap.backup.${Date.now()}.xml`,
);

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

try {
  // Read the sitemap file
  let sitemap = fs.readFileSync(sitemapPath, "utf8");

  // Backup the original sitemap
  fs.writeFileSync(backupPath, sitemap, "utf8");

  // Remove all XML comments (including commented-out URLs)
  sitemap = sitemap.replace(/<!--([\s\S]*?)-->/g, "");

  // Update <lastmod> only inside <url> blocks
  sitemap = sitemap.replace(
    /(<url>[\s\S]*?<lastmod>)(\d{4}-\d{2}-\d{2})(<\/lastmod>[\s\S]*?<\/url>)/g,
    `$1${today}$3`,
  );

  // Remove extra blank lines and trim
  sitemap = sitemap.replace(/\n{2,}/g, "\n").trim();

  // Write the updated sitemap back
  fs.writeFileSync(sitemapPath, sitemap, "utf8");

  console.log(
    `✓ Sitemap cleaned, <lastmod> updated, and backup saved as ${path.basename(backupPath)}`,
  );
} catch (err) {
  console.error("✗ Error updating sitemap:", err);
  process.exit(1);
}
