const EXTERNAL_DATA_URL_ARTICLES = 'https://back.unetaupechezvous.fr/public/api/articles';
const EXTERNAL_DATA_URL_SERVICES = 'https://back.unetaupechezvous.fr/public/api/posts';

function generateSiteMap(services, articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://unetaupechezvous.fr</loc>
     </url>
     <url>
       <loc>https://unetaupechezvous.fr/page/Contact</loc>
     </url>
     <url>
        <loc>https://unetaupechezvous.fr/page/qui-sommes-nous</loc>
    </url>
    <url>
        <loc>https://unetaupechezvous.fr/page/mentions-legales</loc>
    </url>
     ${services
    .map(({ slug }) => `
       <url>
           <loc>${`https://unetaupechezvous.fr/${slug}`}</loc>
       </url>
     `)
    .join('')}
    ${articles
    .map(({ slug }) => `
        <url>
            <loc>${`https://unetaupechezvous.fr/${slug}`}</loc>
        </url>
        `)
    .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const articlesResponse = await fetch(EXTERNAL_DATA_URL_ARTICLES);
  const articles = await articlesResponse.json();

  const servicesResponse = await fetch(EXTERNAL_DATA_URL_SERVICES);
  const services = await servicesResponse.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(articles, services);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {
      articles,
      services,
    },
  };
}

export default SiteMap;
