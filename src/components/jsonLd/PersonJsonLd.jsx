import Head from 'next/head';

export default function PersonJsonLd({ page }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${process.env.NEXT_PUBLIC_URL}/Taupier-agree-professionnel-depuis-1994`,
    name: 'Laurent THENEAU',
    url: `${process.env.NEXT_PUBLIC_URL}/Taupier-agree-professionnel-depuis-1994`,
    image: page.imgPost,
    jobTitle: 'Taupier agréé',
    worksFor: {
      '@type': 'LocalBusiness',
      '@id': process.env.NEXT_PUBLIC_URL,
      name: 'Une Taupe Chez Vous',
    },
    telephone: '+33232264958',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '71 rue Marie Curie',
      addressLocality: 'La Garenne-sur-Eure',
      postalCode: '27780',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://twitter.com/UneTaupe_',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
    </Head>
  );
}
