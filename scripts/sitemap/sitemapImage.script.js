const fs = require('fs');

const generateSitemapImages = async () => {
  const urlApi = 'https://back.unetaupechezvous.fr/api/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const responseAll = await fetchJson(`${urlApi}posts/sitemap`);

  const generateXmlWithImages = (pages) => {
    const urlFront = 'https://unetaupechezvous.fr';

    const sitemapXmlWithImages = pages
      .map((page) => `<url>
                  <loc>${urlFront}${page.url}</loc>
                  <image:image>
                    <image:loc>${page.imgPost}</image:loc>
                  </image:image>
                  ${page.paragraphPosts.map((paragraph) => paragraph.imgPost
                       && `<image:image>
                         <image:loc>${paragraph.imgPost}</image:loc>
                       </image:image>`).join('')}
                </url>`).join('');

    const sitemapIndexXmlWithImages = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${sitemapXmlWithImages}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap_images.xml', sitemapIndexXmlWithImages);
  };

  generateXmlWithImages(responseAll);

  const totalNumArticles = responseAll.length;
  console.log(`Total number of news articles in the sitemap: ${totalNumArticles}`);
};

generateSitemapImages();
