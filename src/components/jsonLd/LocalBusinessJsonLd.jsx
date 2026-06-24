/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta, reviewsData }) {
  const { result } = reviewsData || {};
  if (!result) return null;
  const reviews = Array.isArray(result.reviews) ? result.reviews : [];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_URL}/#localbusiness`,
    name: result.name || 'Une Taupe Chez Vous',
    isPartOf: { '@id': `${process.env.NEXT_PUBLIC_URL}/#website` },
    description: descriptionMeta,
    image: 'https://picture.unetaupechezvous.fr/Une-Taupe-Chez-Vous-Taupier-10.webp',
    logo: {
      '@type': 'ImageObject',
      url: 'https://picture.unetaupechezvous.fr/logo-une-taupe-chez-vous.png',
    },
    url: process.env.NEXT_PUBLIC_URL,
    telephone: '+33232264958',
    priceRange: 'À partir de 150 € TTC',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Chèque, Virement bancaire',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '71 rue Marie Curie',
      addressLocality: 'La Garenne-sur-Eure',
      postalCode: '27780',
      addressCountry: 'FR',
      addressRegion: 'Normandie',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8305,
      longitude: 1.2176,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Yvelines', identifier: '78' },
      { '@type': 'AdministrativeArea', name: 'Eure', identifier: '27' },
      { '@type': 'AdministrativeArea', name: 'Eure-et-Loir', identifier: '28' },
      { '@type': 'AdministrativeArea', name: 'Essonne', identifier: '91' },
      { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine', identifier: '92' },
      { '@type': 'AdministrativeArea', name: "Val-d'Oise", identifier: '95' },
      { '@type': 'AdministrativeArea', name: 'Seine-et-Marne', identifier: '77' },
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'AdministrativeArea', name: 'Normandie' },
    ],
    sameAs: [
      'https://www.facebook.com/unetaupechezvous/',
      'https://twitter.com/UneTaupe_',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
      'https://www.tiktok.com/@une_taupe_chez_vous',
      'https://www.youtube.com/@unetaupechezvous',
      'https://www.instagram.com/unetaupechezvous/',
    ],
    founder: {
      '@type': 'Person',
      name: 'Laurent THENEAU',
      url: `${process.env.NEXT_PUBLIC_URL}/Taupier-agree-professionnel-depuis-1994`,
    },
    foundingDate: '1994',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de dénuisibilisation',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Élimination des taupes — Taupier dans les Yvelines (78)',
            description: "Taupier agréé depuis 1994 : piégeage et élimination professionnelle des taupes dans les Yvelines (78), l'Île-de-France et la Normandie.",
            areaServed: 'Yvelines (78), Île-de-France, Normandie',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Élimination des fouines',
            description: "Délogement et piégeage des fouines dans les greniers, combles et habitations dans les Yvelines (78) et l'Île-de-France.",
            areaServed: 'Yvelines (78), Île-de-France',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dératisation des ragondins',
            description: "Piégeage et élimination des ragondins pour la protection des berges et jardins dans les Yvelines (78), l'Île-de-France et la Normandie.",
            areaServed: 'Yvelines (78), Île-de-France, Normandie',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dératisation et désinsectisation',
            description: "Traitement professionnel contre les rats, souris, blattes et autres nuisibles en Île-de-France.",
            areaServed: 'Île-de-France',
          },
        },
      ],
    },
    ...(result.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: result.rating,
        reviewCount: result.user_ratings_total,
      },
    }),
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author_name,
      },
      datePublished: new Date(review.time * 1000).toISOString(),
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
      },
    })),
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
