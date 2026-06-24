/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function SearchJsonLd() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${process.env.NEXT_PUBLIC_URL}/#website`,
            name: 'Une Taupe Chez Vous',
            url: `${process.env.NEXT_PUBLIC_URL}`,
            inLanguage: 'fr-FR',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${process.env.NEXT_PUBLIC_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </Head>
  );
}
