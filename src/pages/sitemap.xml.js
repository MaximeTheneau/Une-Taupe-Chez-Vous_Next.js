function escapeXmlSpecialCharacters(str) {
  return str.replace(/[&<>'"]/g, (match) => {
    switch (match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return match;
    }
  });
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${posts
    .map(({
      slug, priority, updatedAt, createdAt,
    }) => {
      const escapedSlug = escapeXmlSpecialCharacters(slug);
      return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_URL}/${escapedSlug}`}</loc>
            <changefreq>daily</changefreq>
            <priority>${priority}</priority>
            <lastmod>${updatedAt || createdAt}</lastmod>
       </url>
    `;
    })
    .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}sitemap`);
  const posts = await request.json();
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
