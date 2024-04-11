import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Pages.module.scss';
import GoogleMaps from '../components/maps/GoogleMaps';
import NotCopie from '../components/notCopie/NotCopie';
import fetcher from '../utils/fetcher';
import TableOfContents from '../components/tableOfContents/TableOfContents';
import ContactButton from '../components/button/ContactButton';
import ImageLoader from '../components/image/ImageLoader';

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
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <section>
        <figure>
          <ImageLoader
            src={`${page.imgPost}.webp`}
            alt={page.altImg || page.title}
            width={page.imgWidth}
            height={page.imgHeight}
            priority
          />
          {page.title !== page.altImg && (
          <figcaption className="caption">
            {page.altImg}
          </figcaption>
          )}
        </figure>
        <h1>{page.title}</h1>
        <div itemScope itemType="https://schema.org/PostalAdress">

          <p itemProp="name">
            <strong>Entreprise : </strong>
            <span itemProp="name">Une Taupe Chez Vous</span>
          </p>
          <p itemProp="address">
            <strong>Adresse : </strong>
            <span itemProp="streetAddress">71 Marie Curie </span>
            <span itemProp="postalCode">27780 </span>
            <span itemProp="addressLocality">Garrennes-Sur-Eure</span>
          </p>
          <p itemProp="telephone">
            <strong>Téléphone : </strong>
            <Link href="tel:+33232264958"> +33 2 32 26 49 58</Link>
          </p>
          <NotCopie />
          <p>
            <strong>Numéro SIRET :</strong>
            {' '}
            39338032400029
          </p>
          <GoogleMaps />
          <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
          <TableOfContents post={page} />
        </div>
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
                  <ImageLoader
                    src={`${paragraphArticle.imgPostParagh}.webp`}
                    alt={paragraphArticle.altImg}
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
