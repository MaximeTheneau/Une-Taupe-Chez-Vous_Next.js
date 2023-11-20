import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import imageLoaderFull from '../../utils/imageLoaderFull';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import Comments from '../../components/comments/Comments';
import Cards from '../../components/cards/cards';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const desc = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=keyword&limit=3&id=${post.id}`);

  return { props: { desc, post }, revalidate: 10 };
}

export default function Slug({ desc, post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
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
        <p className={styles.page__contents__date}>
          {post.formattedDate}
        </p>
        <div className={styles.page__image}>
          <figure>
            <Image
              src={`${post.imgPost}.webp`}
              alt={post.altImg || post.title}
              loader={imageLoaderFull}
              quality={75}
              width={1080}
              height={810}
              sizes="(max-width: 640px) 100vw,
                (max-width: 750px) 100vw,
                (max-width: 828px) 100vw,
                (max-width: 1080px) 100vw,
                100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              priority
            />
            {post.title !== post.altImg && (
              <figcaption className="caption">
                {post.altImg}
              </figcaption>
            )}
          </figure>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contents }} />
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
        <TableOfContents post={post} />
        {post.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
            {paragraphPosts.linkSubtitle && (
              <div className={styles.page__contents__paragraph__links}>
                <span className={styles.page__contents__paragraph__links__link}>
                  → A lire aussi :
                  <Link href={paragraphPosts.link}>
                    {' '}
                    {paragraphPosts.linkSubtitle}
                  </Link>
                </span>
              </div>
            )}
          </>
        ))}
        <Link href="/Contact" className="button">
          Contactez-nous
        </Link>
      </section>
      <section>
        <h2>Retrouver nos derniers articles :</h2>
        <Cards cards={desc} />
        <Comments posts={post} />
      </section>
    </>
  );
}
