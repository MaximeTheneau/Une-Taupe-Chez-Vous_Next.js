/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Une taupe chez vous',
    description: descriptionMeta,
    image: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/logo-une-taupe-chez-vous.png`,
    url: process.env.NEXT_PUBLIC_URL,
    telephone: '+33232264958',
    sameAs: [
      'https://www.facebook.com/unetaupechezvous/',
      'https://twitter.com/UneTaupe_',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '71 rue Marie Curie',
      addressLocality: 'Garrenne Sur Eure',
      postalCode: '27780',
      addressCountry: 'France',
    },
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
