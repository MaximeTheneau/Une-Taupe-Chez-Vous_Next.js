import Head from 'next/head';

export default function BreadcrumbJsonLd({ breadcrumbs }) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map(({ name, url }, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name,
              item: {
                '@type': 'WebPage',
                '@id': url,
                name,
              },
            })),
          }),
        }}
      />
    </Head>
  );
}
