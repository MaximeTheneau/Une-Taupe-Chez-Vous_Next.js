const fs = require('fs');

const generateSitemapIndex = () => {
  const urlFront = 'https://unetaupechezvous.fr';
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${urlFront}/sitemap_images.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap_all_links.xml</loc>
      </sitemap>
      <!-- Ajoutez d'autres sitemaps ici -->
    </sitemapindex>`;

  fs.writeFileSync('./public/sitemap_index.xml', sitemapIndex);
};

generateSitemapIndex();
