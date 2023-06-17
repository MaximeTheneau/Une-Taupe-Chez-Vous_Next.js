const fs = require('fs');


const generateSitemap = async () => {
  const urlApi = 'https://back.unetaupechezvous.fr/public/api/';
  const urlFront = 'https://unetaupechezvous.fr/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages, priority, urlFront, filename) => {
    const sitemapXml = pages
      .map((page) => 
      `<url>
          <loc>${urlFront}${page.slug}</loc>
          <lastmod>${page.updatedAt ? page.updatedAt : page.createdAt}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${priority}</priority>
        </url>`)
      .join('');

    const sitemapIndexXml = 
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync(`./public/sitemap/${filename}.xml`, sitemapIndexXml);
  };

  const generateXmlPages = async (pages, priority, urlFront) => {
    generateXml(pages, priority, urlFront, `sitemap-p${priority}`);
  };

  const generateXmlCategory = async (pages, name, priority, urlFront) => {
    generateXml(pages, priority, urlFront, `sitemap-${name}`);
  };

  const generateXmlSubcategory = async (pages, priority, urlFront) => {
    const sitemapXml = pages
      .map((page) => 
      `<url>
          <loc>${urlFront}Articles/${page.subcategory.slug}/${page.slug}</loc>
          <lastmod>${page.updatedAt ? page.updatedAt : page.createdAt}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${priority}</priority>
        </url>`)
      .join('');

    const sitemapIndexXml = 
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap-Articles.xml', sitemapIndexXml);
  };

  const responsePages = await fetchJson(`${urlApi}posts&category=Pages`);
  const responseAnuaire = await fetchJson(`${urlApi}posts&category=Annuaire`);
  const responseInterventions = await fetchJson(`${urlApi}posts&category=Interventions`);
  const responseArticles = await fetchJson(`${urlApi}posts&category=Articles`);

  const urlsPriority = responsePages.filter((page) => [
    'Accueil',
    'Contact',
    'Interventions',
    'Taupier-agree-professionnel-depuis-1994',
    'Foire-aux-questions',
  ].includes(page.slug));

  urlsPriority.forEach((page) => {
    if (page.slug === 'Accueil') {
      page.slug = '';
    }
  });

  const urlsNoPriority = responsePages.filter((page) => [
    'Articles',
    'Annuaire',
    'Inscription-annuaire-gratuite',
    'Mentions-Legales',
    'Plan-de-site',
    'Page-de-recherche',
    'Temoignages',
    'Tarifs',
  ].includes(page.slug));

  urlsNoPriority.forEach((page) => {
    if (page.slug === 'Inscription-annuaire-gratuite') {
      page.slug = 'Annuaire/Inscription-annuaire-gratuite';
    }
  });

  await generateXmlPages(urlsPriority, 1.0, urlFront);
  await generateXmlPages(urlsNoPriority, 0.6, urlFront);
  await generateXmlCategory(responseAnuaire, 'Annuaire', 0.6, urlFront+ 'Annuaire/');
  await generateXmlCategory(responseInterventions, 'Interventions', 0.8, urlFront + 'Interventions/');
  await generateXmlSubcategory(responseArticles, 0.6, urlFront);

  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap-Annuaire.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap-Articles.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap-Interventions.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap-p0.6.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap-p1.xml</loc>
      </sitemap>
    </sitemapindex>`;

  const robotsTxt = `
    User-agent: *
    allow: /
    
    disallow: /Interventions/[slug]
    disallow: /Articles/[subcategory]
    disallow: /Articles/[subcategory]/[slug]
    disallow: /Annuaire/[slug]

    # Host
    Host: ${urlFront}
    
    # Sitemaps
    Sitemap: ${urlFront}sitemap.xml
    `;
    
  fs.writeFileSync('./public/sitemap.xml', sitemapIndexXml);
  fs.writeFileSync('./public/robots.txt', robotsTxt );

  const numPagesPriority = urlsPriority.length;
  const numPagesNoPriority = urlsNoPriority.length;
  const numPagesAnnuaire = responseAnuaire.length;
  const numPagesInterventions = responseInterventions.length;
  const numPagesArticles = responseArticles.length;
  const numPages = numPagesPriority + numPagesNoPriority + numPagesAnnuaire + numPagesInterventions + numPagesArticles;

  const pageCounts = [
    { category: 'Priority Pages', count: numPagesPriority },
    { category: 'Non-Priority Pages', count: numPagesNoPriority },
    { category: 'Annuaire Pages', count: numPagesAnnuaire },
    { category: 'Interventions Pages', count: numPagesInterventions },
    { category: 'Articles Pages', count: numPagesArticles },
  ];

  const total = [
    {  category: 'total Pages', count: numPages },
    ];

  console.log('Sitemap generated successfully!');
  console.table(pageCounts);
  console.log('-------------------------');
  console.table(total);
  console.log('-----------------------------------------------------');
  console.log(`  ○ ${urlFront}sitemap.xml ○`);
  console.log('-----------------------------------------------------');

  
};

generateSitemap();
