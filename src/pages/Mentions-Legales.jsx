import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fetcher from '../utils/fetcher';
import styles from '../styles/Pages.module.scss';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);

  return {
    props: {
      page,
    },
  };
}

export default function MentionsLegal({ page }) {
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <>
        <Head>
          <title>{page.heading}</title>
          <meta name="description" content={page.metaDescription} />
          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={page.title} />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
          <meta property="og:description" content={page.metaDescription} />
          <meta property="og:site_name" content="Une Taupe Chez Vous" />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
          <link
            rel="canonical"
            href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
            key="canonical"
          />
        </Head>
        <section>
          <h1>{page.title}</h1>
          <h2>{page.subtitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
          {page.paragraphPosts.map((paragraphArticle) => (
            <div key={paragraphArticle.id}>
              {paragraphArticle.subtitle && (
              <h2 id={paragraphArticle.slug}>
                {paragraphArticle.subtitle}
              </h2>
              )}
              {paragraphArticle.paragraph && (
              <div key={paragraphArticle.id} className={styles.page__contents__paragraph}>
                {paragraphArticle.imgPostParagh && (
                <figure className={styles.page__contents__paragraph__figure}>
                  <Image
                    src={`${paragraphArticle.imgPostParagh}.webp`}
                    alt={paragraphArticle.altImg}
                    quality={75}
                    width={paragraphArticle.imgWidth}
                    height={paragraphArticle.height}
                  />
                  {paragraphArticle.subtitle !== paragraphArticle.altImgParagh && (
                  <figcaption className="caption">
                    {paragraphArticle.altImg}
                  </figcaption>
                  )}
                </figure>
                )}
                <div
                  className={styles.page__contents__paragraph__text}
                  dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }}
                />
                {paragraphArticle.link && (
                  <div className={styles.page__contents__paragraph__links}>
                    <span className={styles.page__contents__paragraph__links__link}>
                      → A lire aussi :
                      <Link href={paragraphArticle.link}>
                        {' '}
                        {paragraphArticle.linkSubtitle}
                      </Link>
                    </span>
                  </div>
                )}
              </div>
              )}
            </div>
          ))}
        </section>
      </>
    </>
  );
}
