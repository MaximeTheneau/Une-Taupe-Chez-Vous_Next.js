/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta, reviews }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: reviews.reviews,
    description: descriptionMeta,
    image: 'https://picture.unetaupechezvous.fr/Une-Taupe-Chez-Vous-Taupier-10.webp',
    logo: 'https://picture.unetaupechezvous.fr/logo-une-taupe-chez-vous.png',
    sameAs: [
      'https://www.facebook.com/unetaupechezvous/',
      'https://twitter.com/UneTaupe_',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
    ],
    provider: {
      '@type': 'LocalBusiness',
      name: reviews.name,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.rating,
      reviewCount: reviews.user_ratings_total,
    },
    review: [
      reviews.result.reviews.map((review) => (
        {
          '@type': 'Review',
          author: review.author_name,
          datePublished: new Date(review.time * 1000).toISOString(),
          reviewBody: review.text,
          reviewRating: {
            '@type': 'rating',
            ratingValue: review.rating,
          },
        })),
    ],
    priceRange: 'À partir de 150 € TTC',
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
