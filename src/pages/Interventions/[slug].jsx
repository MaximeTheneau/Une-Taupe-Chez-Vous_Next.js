import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import ContactButton from '../../components/button/ContactButton';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  return { props: { post } };
}

export default function Slug({ post }) {
  return (
    <>
      <Head>
        <title>{post.heading}</title>
        <meta name="description" content={post.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <meta property="og:image:width" content={post.imgWidth} />
        <meta property="og:image:height" content={post.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`}
          key="canonical"
        />
      </Head>
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
      <ArticleJsonLd post={post} />
      <section>
        <h1>{post.title}</h1>
        <nav>
          <ul className={styles.page__category}>
            <li>
              <Link href="/Interventions">
                Interventions
              </Link>
            </li>
          </ul>
        </nav>
        <p className={styles.page__contents__date}>
          {post.formattedDate}
        </p>
        <div className={styles.page__image}>
          <figure>
            <Image
              src={`${post.imgPost}.webp`}
              alt={post.altImg || post.title}
              width={post.imgWidth}
              height={post.imgHeight}
              sizes="(max-width: 300px) 100vw,
              (max-width: 500px) 100vw,
              (max-width: 800px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
              priority
            />
            {post.title !== post.altImg && (
              <figcaption className="caption">
                {post.altImg}
              </figcaption>
            )}
          </figure>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentsHTML }} />
        <div className="overflow-x-auto">
          <table className={styles.page__table}>
            <thead>
              <tr>
                {post.listPosts.map((listArticle) => listArticle.title !== null
                  && listArticle.title && <th>{listArticle.title}</th>)}
              </tr>

            </thead>
            <tbody>
              <tr>
                {
                    post.listPosts.map(
                      (listArticle) => listArticle.title !== null
                        && listArticle.description && <td>{listArticle.description}</td>,
                    )
                  }
              </tr>
            </tbody>
          </table>
        </div>
        <TableOfContents post={post} />
        {post.paragraphPosts.map((paragraphArticle) => (
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
                    alt={paragraphArticle.subtitle}
                    quality={75}
                    width={paragraphArticle.imgWidth}
                    height={paragraphArticle.imgHeight}
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
        <ContactButton />
      </section>
    </>
  );
}
