import Head from 'next/head';

export default function ArticleJsonLd({ post, urlPost }) {
  const jsonLdData = {
    '@type': 'BlogPosting',
    '@id': `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}`,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}`,
    name: post.title,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.createdAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    url: urlPost,
    articleSection: `${post.subcategory ? `${post.subcategory.name},` : ''} ${post.category.name}`,
    isAccessibleForFree: true,
    keywords: `${post.title}, ${post.category.name}${post.subcategory ? `, ${post.subcategory.name}` : ''}`,
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
    },
    commentCount: post.comments.length,
    comment: [
      post.comments.map((comment) => ({
        '@type': 'Comment',
        author: {
          '@type': 'Person',
          name: comment.User,
        },
        description: comment.comment,
        dateCreated: comment.createdAt,
      })),
    ],
    isPartOf: {
      '@type': post.category.name,
      '@id': `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}`,
      name: `Une taupe chez vous - ${post.category.name}`,
      publisher: {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_URL}`,
        name: `Une taupe chez vous -  ${post.category.name}`,
      },
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
