const fs = require('fs');

const generateSitemap = async () => {
  const urlApi = 'https://back.unetaupechezvous.fr/api/';
  const urlFront = 'https://unetaupechezvous.fr';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages, urlFront) => {
    const sitemapXml = pages
      .map((page) => `<url>
          <loc>${urlFront}${page.url}</loc>
          <lastmod>${page.updatedAt ? page.updatedAt : page.createdAt}</lastmod>
        </url>`)
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap_all_links.xml', sitemapIndexXml);
  };

  // Fetch data from API
  const responsePages = await fetchJson(`${urlApi}posts&category=Pages`);
  const responseAnuaire = await fetchJson(`${urlApi}posts&category=Annuaire`);
  const responseInterventions = await fetchJson(`${urlApi}posts&category=Interventions`);

  // Define page priorities and filter URLs
  const pagesWithPriority = responsePages.map((page) => {
    if (page.slug === 'Accueil') {
      page.slug = '';
    }
    return page;
  });

  responseInterventions.forEach((page) => {
    page.slug = `Interventions/${page.slug}`;
    page.priority = 0.8;
  });

  responseAnuaire.forEach((page) => {
    page.slug = `Annuaire/${page.slug}`;
    page.priority = 0.6;
  });

  const addPages = [
    { url: '/Articles/Nuisibles', updatedAt: '2023-10-13T11:11:41+00:00' },
    { url: '/Articles/Jardin-et-Maison', updatedAt: '2023-10-13T11:11:41+00:00' },
    { url: '/Articles/Piege', updatedAt: '2023-10-13T11:11:41+00:00' },
  ];

  // Generate sitemap with pages
  const allPages = [
    ...pagesWithPriority,
    ...responseAnuaire,
    ...responseInterventions,
    ...addPages,
  ];

  generateXml(allPages, urlFront);

  // Generate sitemap index (if needed)
  // ...
  const totalNumPages = allPages.length;
  console.log(`Total number of pages in the sitemap: ${totalNumPages}`);

  console.log('Sitemap generated successfully!');
};

generateSitemap();
