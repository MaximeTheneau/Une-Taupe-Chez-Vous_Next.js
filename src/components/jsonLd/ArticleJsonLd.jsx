import Head from 'next/head';

export default function ArticleJsonLd({ post, urlPost }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': urlPost,
    mainEntityOfPage: urlPost,
    name: post.title,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.createdAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    url: urlPost,
    ...(post.category && {
      articleSection: `${post.subcategory ? `${post.subcategory.name}, ` : ''}${post.category.name}`,
      keywords: `${post.title}, ${post.category.name}${post.subcategory ? `, ${post.subcategory.name}` : ''}`,
    }),
    isAccessibleForFree: true,
    articleBody: post.contents,
    image: {
      '@type': 'ImageObject',
      '@id': `${post.imgPost}?format=jpeg`,
      url: `${post.imgPost}?format=jpeg`,
      height: post.imgHeight,
      width: post.imgWidth,
    },
    author: {
      '@type': 'Person',
      name: 'Laurent THENEAU',
      url: `${process.env.NEXT_PUBLIC_URL}/Taupier-agree-professionnel-depuis-1994`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Une taupe chez vous',
      logo: {
        '@type': 'ImageObject',
        url: 'https://picture.unetaupechezvous.fr/logo-une-taupe-chez-vous.png',
      },
    },
    commentCount: Array.isArray(post.comments) ? post.comments.length : 0,
    comment: (Array.isArray(post.comments) ? post.comments : []).map((comment) => ({
      '@type': 'Comment',
      author: {
        '@type': 'Person',
        name: comment.User,
      },
      description: comment.comment,
      dateCreated: comment.createdAt,
    })),
    ...(post.category && {
      isPartOf: {
        '@type': 'Blog',
        '@id': `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}`,
        name: `Une taupe chez vous - ${post.category.name}`,
        publisher: {
          '@type': 'Organization',
          '@id': process.env.NEXT_PUBLIC_URL,
          name: 'Une taupe chez vous',
        },
      },
    }),
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
