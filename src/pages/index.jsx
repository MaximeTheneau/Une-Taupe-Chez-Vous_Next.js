import Head from 'next/head';
import Link from 'next/link';
import Cards from '../components/cardsHome/cardsHome';
import styles from '../styles/Home.module.scss';
import fetcher from '../utils/fetcher';
import LocalBusinessJsonLd from '../components/jsonLd/LocalBusinessJsonLd';
import DevisButton from '../components/button/DevisButton';
import ImageLoader from '../components/image/ImageLoader';
import Review from '../components/review/Review';

export async function getStaticProps() {
  const home = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  const responseMaps = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_API_PLACEID}&language=fr&key=${process.env.GOOGLE_API_KEY}`);

  const reviews = await responseMaps.json();

  return {
    props: {
      accueil: home.home,
      services: home.interventions,
      testimonials: home.testimonials,
      reviews,
    },
  };
}
export default function Home({
  accueil, services, testimonials, reviews,
}) {
  const { paragraphPosts } = accueil;
  const firstPost = paragraphPosts[0];
  const otherPosts = paragraphPosts.slice(1);
  const latestThreeReviews = reviews.result.reviews.slice(0, 3);
  return (
    <>
      <Head>
        <title>{accueil.heading}</title>
        <meta name="description" content={accueil.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.heading} />
        <meta property="og:description" content={accueil.metaDescription} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${accueil.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={accueil.imgWidth} />
        <meta property="og:image:height" content={accueil.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={accueil.heading} />
        <meta name="twitter:description" content={accueil.metaDescription} />
        <meta name="twitter:image" content={`${accueil.imgPost}?format=jpeg`} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          imageSrcSet={accueil.srcset}
          imageSizes="100w"
          fetchPriority="high"
        />
      </Head>
      <LocalBusinessJsonLd descriptionMeta={accueil.metaDescription} reviewsData={reviews} />
      <div className={styles.home__imagesFull}>
        <div className={styles.home__imagesFull__image}>
          <ImageLoader
            src={`${accueil.imgPost}`}
            alt={accueil.altImg || accueil.title}
            width={accueil.imgWidth}
            height={accueil.imgHeight}
            srcset={accueil.srcset}
            priority
          />
        </div>
        <div className={styles.home__imagesFull__text}>
          <h1>{accueil.title}</h1>
          <div className={styles['home__imagesFull__text--paragraph']} dangerouslySetInnerHTML={{ __html: accueil.contents }} />
          <DevisButton />
        </div>
      </div>
      <section className={styles.home}>
        {firstPost && (
        <div key={firstPost.subtitle}>
          <h2>{firstPost.subtitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: firstPost.paragraph }} />
        </div>
        )}
        {/* --Services--*/}
        <Cards cards={services} />
        {otherPosts.map((post) => (
          <div key={post.subtitle} className={`${post.subtitle === 'Pourquoi Choisir Nos Services de Taupier Agréé ?' ? styles.home__list : ''}`}>
            <h2>{post.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.paragraph }} />
          </div>
        ))}
        <h2>
          <Link href={testimonials.slug}>
            {testimonials.title}
            {' '}
            de Clients Satisfaits
          </Link>
        </h2>
        <div className={styles.page__reviews}>
          {latestThreeReviews.map((review) => (
            <Review key={review.time} review={review} />
          ))}
        </div>
        <p>
          <Link href="/Temoignages">
            Consultez tous nos avis ici
          </Link>
        </p>
        <p>
          {testimonials.contents}
        </p>
        <div dangerouslySetInnerHTML={{ __html: testimonials.paragraphPosts[0].paragraph }} />
        {accueil.listPosts.map((listArticle) => (
          listArticle.title !== null && (
          <div key={listArticle.title}>
            {listArticle.title && (
            <h2>{listArticle.title}</h2>
            )}
            {listArticle.description && (
            <div dangerouslySetInnerHTML={{ __html: listArticle.description }} />
            )}
          </div>
          )
        ))}
      </section>
    </>
  );
}
