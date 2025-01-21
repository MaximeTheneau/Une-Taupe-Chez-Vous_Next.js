import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Pages.module.scss';
import GoogleMaps from '../components/maps/GoogleMaps';
import NotCopie from '../components/notCopie/NotCopie';
import fetcher from '../utils/fetcher';
import TableOfContents from '../components/tableOfContents/TableOfContents';
import ContactButton from '../components/button/ContactButton';
import ImageLoader from '../components/image/ImageLoader';
import ImageObjectJsonLd from '../components/jsonLd/ImageObjectJsonLd';
import BreadcrumbJsonLd from '../components/jsonLd/BreadcrumbJsonLd';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Taupier-agree-professionnel-depuis-1994`);

  return {
    props: {
      page,
    },
  };
}

export default function TaupierPage({ page }) {
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
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta property="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={page.altImg || page.title} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          imageSrcSet={page.srcset}
          imageSizes="100w"
          fetchPriority="high"
        />
      </Head>
      {/* Schema.org */}
      <ImageObjectJsonLd post={page} />
      <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}/${page.urlPost}`} />
      <section>
        <figure>
          <ImageLoader
            src={page.imgPost}
            alt={page.altImg || page.title}
            width={page.imgWidth}
            height={page.imgHeight}
            srcset={page.srcset}
            priority
          />
          {page.title !== page.altImg && (
          <figcaption className="caption">
            {page.altImg}
          </figcaption>
          )}
        </figure>
        <h1>{page.title}</h1>
        <div className="flex flex-col">
          <div>
            <p>
              <strong>Entreprise : </strong>
              <span>Une Taupe Chez Vous</span>
            </p>
            <p>
              <strong>📍Adresse : </strong>
              <span>71 Marie Curie </span>
              <span>27780 </span>
              <span>Garrennes-Sur-Eure</span>
            </p>
            <p>
              <strong>📞 Téléphone : </strong>
              <Link href="tel:+33232264958"> +33 2 32 26 49 58</Link>
            </p>
            <NotCopie />
            <p>
              <strong>🏢 Numéro SIRET :</strong>
              {' '}
              39338032400029
            </p>
          </div>

          <GoogleMaps />
        </div>
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
        <TableOfContents post={page} />
        {page.paragraphPosts.map((paragraphArticle) => (
          <div key={paragraphArticle.id}>
            {paragraphArticle.subtitle && (
              <h2 id={paragraphArticle.slug}>
                {paragraphArticle.subtitle}
              </h2>
            )}
            {paragraphArticle.paragraph && (
              <div key={paragraphArticle.id} className={styles.page__contents__paragraph}>
                {paragraphArticle.imgPost && (
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
        <ContactButton />
      </section>
    </>
  );
}
