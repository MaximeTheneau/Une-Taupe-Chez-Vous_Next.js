const fs = require('fs');

const generateSitemapImages = async () => {
    const urlApi = 'https://back.unetaupechezvous.fr/api/';
    const urlFront = 'https://unetaupechezvous.fr/';

    const fetchJson = async (url) => {
      const response = await fetch(url);
      return response.json();
    };
    const responseAll = await fetchJson(`${urlApi}posts/all`);
  
    const generateXmlWithImages = (pages, urlFront) => {
      const sitemapXmlWithImages = pages
        .map((page) => {
          const imagesXml = pages
            .map((image) => `<image:image>
                <image:loc>${image.loc}</image:loc>
                <image:title>${image.title}</image:title>
                <image:caption>${image.caption}</image:caption>
                <!-- Autres balises d'image nécessaires -->
              </image:image>`)
            .join('');
  
          return `<url>
              <loc>${urlFront}${page.slug}</loc>
              <lastmod>${page.updatedAt ? page.updatedAt : page.createdAt}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${page.priority}</priority>
              ${imagesXml}
            </url>`;
        })
        .join('');
  
      const sitemapIndexXmlWithImages = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
          ${sitemapXmlWithImages}
        </urlset>`;
  
      fs.writeFileSync('./public/sitemap_images.xml', sitemapIndexXmlWithImages);
    };

    generateXmlWithImages(responseAll, urlFront);

  };
  
  generateSitemapImages();
  