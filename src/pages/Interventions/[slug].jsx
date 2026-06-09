import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import ImageLoader from '../../components/image/ImageLoader';
import ImageObjectJsonLd from '../../components/jsonLd/ImageObjectJsonLd';
import DevisButton from '../../components/button/DevisButton';

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
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content={`${post.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={post.imgWidth} />
        <meta property="og:image:height" content={post.imgHeight} />
        <meta property="og:image:alt" content={post.altImg || post.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@UneTaupe_" />
        <meta name="twitter:title" content={post.heading} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`${post.imgPost}?format=jpeg`} />
        <meta name="twitter:image:alt" content={post.altImg || post.title} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          href={`${post.imgPost}`}
          imageSrcSet={post.srcset}
          imageSizes="(max-width: 768px) 100vw, 60vw"
          fetchPriority="high"
        />
      </Head>
      {/* Schema.org */}
      <ArticleJsonLd post={post} urlPost={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
      <ImageObjectJsonLd post={post} />
      <BreadcrumbJsonLd breadcrumbs={[
        { name: 'Accueil', url: process.env.NEXT_PUBLIC_URL },
        { name: 'Interventions', url: `${process.env.NEXT_PUBLIC_URL}/Interventions` },
        { name: post.title, url: `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}` },
      ]} />
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
            <ImageLoader
              src={`${post.imgPost}`}
              alt={post.altImg || post.title}
              width={post.imgWidth}
              height={post.imgHeight}
              srcset={post.srcset}
              sizes="(max-width: 768px) 100vw, 60vw"
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
                  <ImageLoader
                    src={paragraphArticle.imgPost}
                    alt={paragraphArticle.altImg}
                    width={paragraphArticle.imgWidth}
                    height={paragraphArticle.imgHeight}
                    srcset={paragraphArticle.srcset}
                    sizes="(max-width: 768px) 100vw, 40vw"
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
        <h2>
          Obtenez un devis gratuit -
          {' '}
          {post.title}
        </h2>
        <p>
          Trouvez une solution rapide et adaptée à vos problèmes de nuisibles.
          Faites votre demande de devis dès maintenant pour une intervention
          efficace et sur mesure !
        </p>
        <DevisButton />
      </section>
    </>
  );
}
