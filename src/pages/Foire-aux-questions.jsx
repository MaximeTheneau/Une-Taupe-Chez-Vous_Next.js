import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Pages.module.scss';
import Faq from '../components/faq/faq';
import fetcher from '../utils/fetcher';
import FaqJsonLd from '../components/jsonLd/FaqJsonLd';

export async function getStaticProps() {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);

  return {
    props: {
      post,
    },
  };
}

export default function Slug({ post }) {
  return (
    <>
      <Head>
        <title>{post.heading}</title>
        <meta name="description" content={post.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.slug}`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <meta property="og:image:width" content={post.imgWidth} />
        <meta property="og:image:height" content={post.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.heading} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${post.slug}`}
          key="canonical"
        />
      </Head>
      <FaqJsonLd listPosts={post.listPosts} />
      <section className={styles.page}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contentsHTML }} />
        <Faq faq={post} />
        {post.paragraphPosts.map((paragraphArticle) => (
          <>
            {paragraphArticle.subtitle && (
            <h2 key={paragraphArticle.id}>{paragraphArticle.subtitle}</h2>
            )}
            {paragraphArticle.paragraph && (
            <p key={paragraphArticle.id} className={styles.page__contents__paragraph}>
              {paragraphArticle.imgPostParagh && (
              <Image
                className={styles.page__contents__paragraph}
                src={`${paragraphArticle.imgPostParagh}.webp`}
                alt={paragraphArticle.subtitle}
                quality={100}
                width="1080"
                height="720"
                sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
              />
              )}
              {paragraphArticle.paragraph}
            </p>
            )}

          </>
        ))}

      </section>
    </>
  );
}
