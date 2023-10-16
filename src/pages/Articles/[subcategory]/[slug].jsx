import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
import styles from '../../../styles/Pages.module.scss';
import Cards from '../../../components/cards/cards';
import Category from '../../../components/category/Category';
import imageLoaderFull from '../../../utils/imageLoaderFull';
import TableOfContents from '../../../components/tableOfContents/TableOfContents';
import fetcher from '../../../utils/fetcher';
import ArticleJsonLd from '../../../components/jsonLd/ArticleJsonLd';
import BreadcrumbJsonLd from '../../../components/jsonLd/BreadcrumbJsonLd';
import Comments from '../../../components/comments/Comments';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);

  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {
      subcategory: post.subcategory ? post.subcategory.slug : '',
      slug: post.slug,
    },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const responsePost = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${slug}`);
  const responseDesc = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=keyword&limit=3&id=${responsePost.id}`);
  

  return { props: { responsePost, responseDesc }, revalidate: 10 };
}

export default function Slug({ responsePost, responseDesc }) {
  const { data: postData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/${responsePost.slug}`);
  const { data: descData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=keyword&limit=3&id=${responsePost.id}`);

  const post = postData || responsePost;
  const desc = descData || responseDesc;

  const urlPost = `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.subcategory.slug}/${post.slug}`;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content={urlPost} />
        <meta property="og:url" content={urlPost} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="720" />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:section" content={post.subcategory.name} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.metaDescription} />
        <meta property="twitter:site" content="@UneTaupe_" />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={post.altImg || post.title} />
        <meta property="twitter:domain" content={urlPost} />
        <meta property="twitter:url" content={urlPost} />
        <link
          rel="canonical"
          href={urlPost}
          key="canonical"
        />
      </Head>
      {/* Schema.org */}
      <ArticleJsonLd post={post} urlPost={urlPost} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={urlPost} />
      <section >
        <h1>{post.title}</h1>
        <Category category={false} subcategoryName={post.subcategory.name} subcategorySlug={post.subcategory.slug}  />
          <p className={styles.page__contents__date}>
            {post.formattedDate}
          </p>
          <figure>
            <Image
              src={`${post.imgPost}.webp`}
              alt={post.altImg || post.title}
              loader={imageLoaderFull}
              quality={75}
              width={1080}
              height={100}
              sizes="(max-width: 640px) 100vw, (max-width: 750px) 750px, (max-width: 828px) 828px, 1080px"
              style={{
                width: '100%',
                height: 'auto',
              }}
              priority
              onLoad={(event) => {
                const image = event.target; // L'élément Image
                const width = image.width;
                const height = image.height;
                console.log(`Largeur : ${width}, Hauteur : ${height}`);
              }}
            />
            {post.title !== post.altImg  && (
              <figcaption className='caption'>
                {post.altImg}
              </figcaption>
            )}
          </figure>
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
              <div key={paragraphArticle.id} className={styles.page__contents__paragraph} >
                {paragraphArticle.imgPostParagh && (
                <figure className={styles.page__contents__paragraph__figure}>
                  <Image
                    src={`${paragraphArticle.imgPostParagh}.webp`}
                    alt={paragraphArticle.subtitle}
                    quality={75}
                    width={1080}
                    height={1080}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  {paragraphArticle.subtitle !== paragraphArticle.altImgParagh && (
                  <figcaption className='caption'>
                    {paragraphArticle.altImg}
                  </figcaption>
                  )}
                </figure>
                )}
              <div className={styles.page__contents__paragraph__text} dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
                {paragraphArticle.link && (
                  <div className={styles.page__contents__paragraph__links}>
                    <span className={styles.page__contents__paragraph__links__link}>
                      → A lire aussi : 
                      <a href={paragraphArticle.link}>
                        {' '}
                        {paragraphArticle.linkSubtitle}
                      </a>
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
                <li key={listArticle.title}>
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

          <h2>Derniers articles</h2>
          <Cards cards={desc} />
          <Comments posts={post} />
      </section>

    </>
  );
}
