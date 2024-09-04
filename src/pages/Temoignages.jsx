import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Pages.module.scss';
import Review from '../components/review/Review';

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`);
  const responseMaps = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_API_PLACEID}&language=fr&key=${process.env.GOOGLE_API_KEY}`);

  const page = await responsePage.json();
  const reviews = await responseMaps.json();

  return {
    props: {
      page,
      reviews,
    },
  };
}
// == Composant
export default function testimonials({ page, reviews,  }) {
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
        <meta property="og:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <section className={styles.page}>
        <h1>{page.title}</h1>
        <p>{page.contentsHTML}</p>
        <p><strong>Une note de {reviews.result.rating}/5 sur {reviews.result.user_ratings_total}</strong>.</p>
        <div className={styles.page__reviews}>
          {reviews.result.reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
        <p>
          <Link href={reviews.result.url} target="_blank" rel="noopener noreferrer">
            Consultez nos avis Google Maps
          </Link>
        </p>
        {page.paragraphPosts.map((paragraphArticle) => (
          <div key={paragraphArticle.id}>
            {paragraphArticle.subtitle && (
              <h2 id={paragraphArticle.slug}>
                {paragraphArticle.subtitle}
              </h2>
            )}
            {paragraphArticle.paragraph && (
              <div key={paragraphArticle.id} className={styles.page__contents__paragraph}>
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
      </section>
    </>
  );
}
