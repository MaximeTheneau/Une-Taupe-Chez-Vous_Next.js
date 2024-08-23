/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Extermination de nuisibles',
    name: 'Une Taupe Chez Vous',
    description: descriptionMeta,
    image: 'https://picture.unetaupechezvous.fr/Une-Taupe-Chez-Vous-Taupier-10.webp',
    logo: 'https://picture.unetaupechezvous.fr/logo-une-taupe-chez-vous.png',
    sameAs: [
      'https://www.facebook.com/unetaupechezvous/',
      'https://twitter.com/UneTaupe_',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
    ],
    priceRange: '€ - €€',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Taupier piégeur professionnel depuis 1994',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '71 rue Marie Curie',
        addressLocality: 'Garrenne Sur Eure',
        postalCode: '27780',
        addressCountry: 'FR',
      },
      telephone: '+33232264958',
      url: process.env.NEXT_PUBLIC_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Yvelines',
    },
    foundingDate: '1994',
    hasCertification: {
      '@type': 'Certification',
      name: 'Taupier piégeur agréé professionnel depuis 1994',
      url: 'https://unetaupechezvous.fr/Taupier-agree-professionnel-depuis-1994',
    },
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceUrl: `${process.env.NEXT_PUBLIC_URL}/search`,
        providesService: {
          '@type': 'Service',
          name: 'Page de recherche',
          description: 'Rechercher un article, un sujet ou un nuisible',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${process.env.NEXT_PUBLIC_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
      },
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
