const fs = require('fs');


const generateSitemap = async () => {
  const urlApi = 'https://back.unetaupechezvous.fr/api/';
  const urlFront = 'https://unetaupechezvous.fr/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages, urlFront) => {
    const sitemapXml = pages
      .map((page) => `<url>
          <loc>${urlFront}${page.slug}</loc>
          <lastmod>${page.updatedAt ? page.updatedAt : page.createdAt}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${page.priority}</priority>
        </url>`)
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap.xml', sitemapIndexXml);
  };

  // Fetch data from API
  const responsePages = await fetchJson(`${urlApi}posts&category=Pages`);
  const responseAnuaire = await fetchJson(`${urlApi}posts&category=Annuaire`);
  const responseInterventions = await fetchJson(`${urlApi}posts&category=Interventions`);
  const responseArticles = await fetchJson(`${urlApi}posts&category=Articles`);

  // Define page priorities and filter URLs
  const pagesWithPriority = responsePages.filter((page) => [
    'Accueil',
    'Contact',
    'Interventions',
    'Taupier-agree-professionnel-depuis-1994',
    'Foire-aux-questions',
  ].includes(page.slug));

  const pagesWithoutPriority = responsePages.filter((page) => [
    'Articles',
    'Annuaire',
    'Inscription-annuaire-gratuite',
    'Mentions-Legales',
    'Plan-de-site',
    'Page-de-recherche',
    'Temoignages',
    'Tarifs',
  ].includes(page.slug));

  // Set priorities for pages
  pagesWithPriority.forEach((page) => {
    if (page.slug === 'Accueil') {
      page.slug = '';
    }
    page.priority = 1.0;
  });

  pagesWithoutPriority.forEach((page) => {
    if (page.slug === 'Inscription-annuaire-gratuite') {
      page.slug = 'Annuaire/Inscription-annuaire-gratuite';
    }
    page.priority = 0.6;
  });

  responseArticles.forEach((page) => {
    page.slug = `Articles/${page.subcategory.slug}/${page.slug}`;
    page.priority = 0.6;
  });
  
  responseInterventions.forEach((page) => {
    page.slug = `Interventions/${page.slug}`;
    page.priority = 0.8;
  });

  responseAnuaire.forEach((page) => {
    page.slug = `Annuaire/${page.slug}`;
    page.priority = 0.6;
  });


  // Generate sitemap with pages
  const allPages = [
    ...pagesWithPriority,
    ...pagesWithoutPriority,
    ...responseAnuaire,
    ...responseInterventions,
    ...responseArticles,
  ];

  generateXml(allPages, urlFront);

  // Generate sitemap index (if needed)
  // ...
  const totalNumPages = allPages.length;
  console.log(`Total number of pages in the sitemap: ${totalNumPages}`);


  console.log('Sitemap generated successfully!');
};

generateSitemap();
