const fs = require('fs');

const generateNewsSitemap = async () => {
  const urlApi = 'https://back.unetaupechezvous.fr/api/';
  const urlFront = 'https://unetaupechezvous.fr';
  const urlCdn = 'https://res.cloudinary.com/dsn2zwbis/image/upload/unetaupechezvous/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (articles, urlFront) => {
    const sitemapXml = articles
      .map((article) => `<url>
          <loc>${urlFront}${article.url}</loc>
          <news:news>
            <news:publication>
              <news:name>${article.title}</news:name>
              <news:language>fr</news:language>
            </news:publication>
            <news:publication_date>${article.updatedAt ? article.updatedAt : article.createdAt}</news:publication_date>
            <news:title>${article.title}</news:title>
            <news:keywords>${article.subcategory.name}</news:keywords>
          </news:news>
        </url>`)
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap_news_articles.xml', sitemapIndexXml);
  };

  // Fetch data from API
  const responseArticles = await fetchJson(`${urlApi}posts&category=Articles`);

  // Generate sitemap with news articles
  generateXml(responseArticles, urlFront);

  const totalNumArticles = responseArticles.length;
  console.log(`Total number of news articles in the sitemap: ${totalNumArticles}`);

  console.log('News sitemap for articles generated successfully!');
};

generateNewsSitemap();
