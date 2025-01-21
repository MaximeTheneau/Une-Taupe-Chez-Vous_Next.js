import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import fetcher from '../../utils/fetcher';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import Comments from '../../components/comments/Comments';
import ArticlesAdsense from '../../components/adsense/ArticlesAdsense';
import ImageLoader from '../../components/image/ImageLoader';
import Cards from '../../components/cardsHome/cardsHome';
import ImageObjectJsonLd from '../../components/jsonLd/ImageObjectJsonLd';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);

  const posts = await res.json();

  const filteredPosts = posts.filter((post) => post.slug !== 'Inscription-annuaire-gratuite');

  const paths = filteredPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const relatedPosts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/related/${params?.slug}`);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}

export default function Slug({ post, relatedPosts }) {
  const urlPost = `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post.heading}</title>
        <meta name="description" content={post.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.heading} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={urlPost} />
        <meta property="og:image" content={`${post.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="720" />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:section" content={post.category.name} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={post.heading} />
        <meta property="twitter:description" content={post.metaDescription} />
        <meta property="twitter:site" content="@UneTaupe_" />
        <meta property="twitter:image" content={`${post.imgPost}?format=jpeg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={post.altImg || post.title} />
        <meta property="twitter:domain" content={urlPost} />
        <meta property="og:image" content={`${post.imgPost}?format=jpeg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          imageSrcSet={post.srcset}
          imageSizes="100w"
          fetchPriority="high"
        />
      </Head>
      {/* Schema.org */}
      <ArticleJsonLd post={post} urlPost={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
      <ImageObjectJsonLd post={post} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}/${post.urlPost}`} />
      <section>
        <h1>{post.title}</h1>
        <ul>
          <li>
            <Link href="/Annuaire" className="stronk">
              Annuaire
            </Link>
          </li>
        </ul>
        <p className={styles.page__contents__date}>
          {post.formattedDate}
        </p>
        <figure>
          <ImageLoader
            src={post.imgPost}
            alt={post.altImg || post.title}
            width={post.imgWidth}
            height={post.imgHeight}
            srcset={post.srcset}
            priority
          />
          {post.title !== post.altImg && (
          <figcaption className="caption">
            {post.altImg}
          </figcaption>
          )}
        </figure>
        <div dangerouslySetInnerHTML={{ __html: post.contentsHTML }} />

        <ArticlesAdsense adSlot={2932584086} adformat="auto" />
        <TableOfContents post={post} />
        {post.paragraphPosts.map((paragraphs) => (
          <>
            <h2 key={paragraphs} id={paragraphs.slug}>{paragraphs.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: paragraphs.paragraph }} />
            {paragraphs.linkSubtitle && (
              <div className={styles.page__contents__paragraph__links}>
                <span className={styles.page__contents__paragraph__links__link}>
                  → A lire aussi :
                  <Link href={paragraphs.link}>
                    {' '}
                    {paragraphs.linkSubtitle}
                  </Link>
                </span>
              </div>
            )}
          </>
        ))}
        <ArticlesAdsense adSlot={9927467340} adformat="fluid" />

      </section>
      <Comments posts={post} />
      <ArticlesAdsense adSlot={2900794494} adformat="autorelaxed" />
      {relatedPosts.length > 0 && (
      <aside>
        <h2>Articles similaires</h2>
        <Cards cards={relatedPosts} />
      </aside>
      )}
    </>
  );
}
