import Head from 'next/head';
import Link from 'next/link';
import RecentArticles from '@/components/ui/RecentArticles';
import styles from '../../../styles/Pages.module.scss';
import Cards from '../../../components/cards/Cards';
import Category from '../../../components/category/Category';
import TableOfContents from '../../../components/tableOfContents/TableOfContents';
import ArticleJsonLd from '../../../components/jsonLd/ArticleJsonLd';
import fetcher from '../../../utils/fetcher';
import BreadcrumbJsonLd from '../../../components/jsonLd/BreadcrumbJsonLd';
import Comments from '../../../components/comments/Comments';
import ImageLoader from '../../../components/image/ImageLoader';
import ImageObjectJsonLd from '../../../components/jsonLd/ImageObjectJsonLd';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);

  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {
      subcategory: post.subcategory.slug,
      slug: post.slug,
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/blog/${slug}`);
  const { id } = post.post;
  const desc = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=keyword&limit=3&id=${id}`);
  const relatedPosts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/related/${slug}`);
  return {
    props: {
      post: post.post,
      desc,
      relatedPosts,
      latestPosts: post.latestPosts,

    },
  };
}

export default function Slug({
  post, desc, relatedPosts, latestPosts,
}) {
  // console.log(id);
  const urlPost = `${process.env.NEXT_PUBLIC_URL}${post.url}`;
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
        <meta property="og:image:width" content={post.imgWidth} />
        <meta property="og:image:height" content={post.imgHeight} />
        <meta property="og:image:alt" content={post.altImg} />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:section" content={post.subcategory.name} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={post.heading} />
        <meta property="twitter:description" content={post.metaDescription} />
        <meta property="twitter:site" content="@UneTaupe_" />
        <meta property="twitter:image" content={`${post.imgPost}?format=jpeg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={post.altImg || post.title} />
        <meta property="twitter:domain" content={urlPost} />
        <meta property="twitter:url" content={urlPost} />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large" />
        <link
          rel="canonical"
          href={urlPost}
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
      <ImageObjectJsonLd post={post} />
      <ArticleJsonLd post={post} urlPost={urlPost} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={urlPost} />
      <div className="flex flex-wrap justify-center">
        <article className=" md:w-3/4 px-4">
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
          <p className={styles.page__contents__date}>
            {post.formattedDate}
          </p>
          <h1>{post.title}</h1>
          <Category
            category={false}
            subcategoryName={post.subcategory.name}
            subcategorySlug={post.subcategory.slug}
          />

          <div dangerouslySetInnerHTML={{ __html: post.contents }} />
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
                  <ImageLoader
                    src={paragraphArticle.imgPost}
                    alt={paragraphArticle.altImg}
                    width={paragraphArticle.imgWidth}
                    height={paragraphArticle.imgHeight}
                    srcset={paragraphArticle.srcset}
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
          <ol>
            {post.listPosts.map((listArticle) => (
              listArticle.title !== null && (
              <li key={listArticle.slug}>
                {listArticle.title && (
                <h3>{listArticle.title}</h3>
                )}
                {listArticle.description && (
                <p>{listArticle.description}</p>
                )}
              </li>
              )
            ))}
          </ol>
          {post.links && (
          <Link href={post.links}>
            {post.textLinks}
          </Link>
          )}
        </article>
        <aside className="w-full md:!w-1/4 bg-secondary p-4">
          <h2 className="text-xl font-bold mb-4">Articles récents :</h2>
          <RecentArticles articles={latestPosts} />
          <h2 className="text-xl font-bold mb-4">Liens utiles :</h2>
          <ul>
            <li className="py-2 !border-b !border-black-200 last:border-b-0">
              <Link href="/Articles" className="block !text-black">
                Blog
              </Link>
            </li>
            <li className="py-2 !border-b !border-black-200 last:border-b-0 ">
              <Link href="/Taupier-agree-professionnel-depuis-1994" className="block !text-black">
                A propos
              </Link>
            </li>
            <li className="py-2 !border-b !border-black-200 last:border-b-0">

              <Link href="/Contact" className="block !text-black">
                Contact
              </Link>
            </li>
          </ul>

        </aside>
        <Comments posts={post} />
      </div>
      <aside>

        <h2>Articles qui pourraient vous intéresser :</h2>
        {!relatedPosts.length > 0 && (
          <Cards cards={desc} />
        )}
        <Cards cards={relatedPosts} />
      </aside>

    </>
  );
}
