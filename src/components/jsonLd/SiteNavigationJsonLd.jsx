/* eslint-disable react/no-danger */
import Head from 'next/head';

const NAV_ITEMS = [
  { position: 1, name: 'Devis en ligne', url: '/Devis-en-ligne' },
  { position: 2, name: 'Contact', url: '/Contact' },
  { position: 3, name: 'Témoignages clients', url: '/Temoignages' },
  { position: 4, name: 'Tarifs', url: '/Tarifs' },
  { position: 5, name: 'Nos interventions', url: '/Interventions' },
  { position: 6, name: 'Taupier agréé professionnel', url: '/Taupier-agree-professionnel-depuis-1994' },
];

export default function SiteNavigationJsonLd() {
  const base = process.env.NEXT_PUBLIC_URL;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Navigation principale',
            itemListElement: NAV_ITEMS.map(({ position, name, url }) => ({
              '@type': 'ListItem',
              position,
              name,
              item: {
                '@type': 'WebPage',
                '@id': `${base}${url}`,
                name,
                url: `${base}${url}`,
                isPartOf: { '@id': `${base}/#website` },
              },
            })),
          }),
        }}
      />
    </Head>
  );
}
