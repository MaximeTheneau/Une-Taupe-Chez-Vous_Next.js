import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
      subcategory: post.subcategory.slug,
      slug: post.slug,
    },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const responsePost = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${slug}`);
  const responseDesc = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&filter=desc&category=articles`);

  return { props: { responsePost, responseDesc }, revalidate: 10 };
}

export default function Slug({ responsePost, responseDesc }) {
  const { data: postData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/${responsePost.slug}`);
  const { data: descData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&filter=desc&category=articles`);

  const post = postData || responsePost;
  const desc = descData || responseDesc;

  const urlPost = `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.subcategory.slug}/${post.slug}`;

  const descriptionMeta = post.contents === null
    ? `Articles de blog ${post.title}`
    : post.contents.substring(0, 165).replace(/[\r\n*_]+/gm, '');
    
  const handleChangeShareSocial = (e) => {
    const social = e.target.value;
    if (social === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${urlPost}`, '_blank');
    } else if (social === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${urlPost}`, '_blank');
    } else if (social === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${urlPost}`, '_blank');
    } else if (social === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${urlPost}`, '_blank');
    } else if (social === 'email') {
      window.open(`mailto:?subject=${post.title}&body=${urlPost}`, '_blank');
    }
  };

  function formatDate({ post }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
      if (diffInMinutes < 1) {
        return "à l'instant";
      } else {
        return `${date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`;
      }
    };
  
    const formattedPubDate = formatDate(post.createdAt);
    const formattedMajDate = formatDate(post.updatedAt);
    
    return (
      <div className="m-b-1 date">
        <span className="fig-content-metas__pub-date fig-content-metas__pub-date--hide-small">
          Publié le 
          {' '}
          <time dateTime={post.createdAt}>{formattedPubDate}</time>.
        </span>
        {post.updatedAt && (
        <>
          {' '}
          <span className="fig-content-metas__pub-maj-date">
            Mis à jour le 
            {' '}
            <time dateTime={post.updatedAt}>{formattedMajDate}</time>.
          </span>
        </>
        )}
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={descriptionMeta} />
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
        <meta property="twitter:description" content={descriptionMeta} />
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
      <section className={styles.page}>
        <Category category={false} subcategoryName={post.subcategory.name} subcategorySlug={post.subcategory.slug}  />
        <div className={styles.page__contents}>
          <h1>{post.title}</h1>
          {formatDate({ post })}
          <div className={styles.page__image}>
          <figure>
            <Image
              src={`${post.imgPost}.webp`}
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
            {post.title !== post.altImg  && (
              <figcaption className='caption'>
                {post.altImg}
              </figcaption>
            )}
          </figure>
        </div>          
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.contents}
          </ReactMarkdown>
          <TableOfContents post={post} />
          {post.paragraphPosts.map((paragraphArticle) => (
            <div key={paragraphArticle.id}>
              {paragraphArticle.subtitle && (
              <h2 id={paragraphArticle.slug}>
                {paragraphArticle.subtitle}
              </h2>
              )}
              {paragraphArticle.paragraph && (
              <div
                key={paragraphArticle.id}
                className={styles.page__contents__paragraph}

              >
                {paragraphArticle.imgPostParagh && (
                <Image
                  className={styles.page__contents__paragraph}
                  src={`${paragraphArticle.imgPostParagh}.webp`}
                  alt={paragraphArticle.subtitle}
                  quality={100}
                  width="1080"
                  height="720"
                  sizes="(max-width: 640px) 100vw, (max-width: 750px) 750px, (max-width: 828px) 828px, 1080px"
                />
                )}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {paragraphArticle.paragraph}
                </ReactMarkdown>
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

          <select onChange={(e) => handleChangeShareSocial(e)} className="select">
            <option value="---">Partager sur ...</option>
            <option value="facebook" data-icon="icon-facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">Linkedin</option>
            <option value="pinterest">Pinterest</option>
            <option value="email">Email</option>
          </select>
        </div>
          <h2>Derniers articles</h2>
          <Cards cards={desc} />
          <Comments posts={post} />
      </section>

    </>
  );
}
