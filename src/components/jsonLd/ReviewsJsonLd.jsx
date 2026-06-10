import Head from 'next/head';

export default function ReviewsJsonLd({ reviews }) {
  const { result } = reviews || {};
  if (!result) return null;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': process.env.NEXT_PUBLIC_URL,
    name: result.name || 'Une Taupe Chez Vous',
    ...(result.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: result.rating,
        reviewCount: result.user_ratings_total,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    review: (Array.isArray(result.reviews) ? result.reviews : []).map((review) => ({
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
        bestRating: 5,
        worstRating: 1,
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
