import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '../../styles/Pages.module.scss';
import imageLoaderFull from '../../utils/imageLoaderFull';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import Comments from '../../components/comments/Comments';
import AuthMiddleware from '../../middleware/AuthMiddleware';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const responsePosts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);

  return { props: { responsePosts }, revalidate: 10 };
}

export default function Slug({ responsePosts }) {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/${responsePosts.slug}`);

  const post = data || responsePosts;

  const descriptionMeta = post.contents && post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
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
      <section className={styles.page}>
        <div className={styles.page__image}>
          <Image
            src={`${post.slug}.webp`}
            alt={post.altImg || post.title}
            loader={imageLoaderFull}
            quality={90}
            width={1080}
            height={608}
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
        </div>
        <div>
          <h1>{post.title}</h1>
          <table className={styles.page__table}>
            <tbody>
              {post.listPosts.map((listArticle) => listArticle.title !== null && (
              <tr key={listArticle.id}>
                {listArticle.title && <th>{listArticle.title}</th>}
                {listArticle.description && <td>{listArticle.description}</td>}
              </tr>
              ))}
            </tbody>
          </table>
          <p>{post.contents}</p>
          <TableOfContents post={post} />
          {post.paragraphPosts.map((paragraphPosts) => (
            <>
              <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
          ))}
          <Link href="/Contact" className="button">
            Contactez-nous
          </Link>
        </div>
      </section>
      <Comments posts={post} />
    </>
  );
}
