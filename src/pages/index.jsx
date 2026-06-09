import Head from 'next/head';
import Link from 'next/link';
import Cards from '../components/cards/Cards';
import styles from '../styles/Home.module.scss';
import fetcher from '../utils/fetcher';
import LocalBusinessJsonLd from '../components/jsonLd/LocalBusinessJsonLd';
import DevisButton from '../components/button/DevisButton';
import ImageLoader from '../components/image/ImageLoader';
import SearchJsonLd from '../components/jsonLd/SearchJsonLd';
import ImageObjectJsonLd from '../components/jsonLd/ImageObjectJsonLd';
import BreadcrumbJsonLd from '../components/jsonLd/BreadcrumbJsonLd';
import FaqJsonLd from '../components/jsonLd/FaqJsonLd';

export async function getStaticProps() {
  const home = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  const responseMaps = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_API_PLACEID}&language=fr&key=${process.env.GOOGLE_API_KEY}`);

  const reviews = await responseMaps.json();

  return {
    props: {
      accueil: home.home,
      services: home.interventions,
      testimonials: home.testimonials,
      blog: home.blog,
      reviews,
    },
  };
}
export default function Home({
  accueil, services, reviews, blog,
}) {
  const { paragraphPosts } = accueil;
  const firstPost = paragraphPosts[0];
  const otherPosts = paragraphPosts.slice(1);
  // const latestThreeReviews = reviews.result?.reviews?.slice(0, 3);
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
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content={`${accueil.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={accueil.imgWidth} />
        <meta property="og:image:height" content={accueil.imgHeight} />
        <meta property="og:image:alt" content={accueil.altImg || accueil.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@UneTaupe_" />
        <meta name="twitter:title" content={accueil.heading} />
        <meta name="twitter:description" content={accueil.metaDescription} />
        <meta name="twitter:image" content={`${accueil.imgPost}?format=jpeg`} />
        <meta name="twitter:image:alt" content={accueil.altImg || accueil.title} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={accueil.imgPost}
          imagesrcset={accueil.srcset}
          imagesizes="(max-width: 768px) 100vw, (min-width: 1270px) 635px, 50vw"
          fetchpriority="high"
        />
      </Head>
      {/* Schema.org */}
      <ImageObjectJsonLd post={accueil} />
      <LocalBusinessJsonLd descriptionMeta={accueil.metaDescription} reviewsData={reviews} />
      <BreadcrumbJsonLd breadcrumbs={[
        { name: 'Accueil', url: process.env.NEXT_PUBLIC_URL },
      ]} />
      <FaqJsonLd listPosts={accueil.listPosts} />
      <SearchJsonLd />
      <div className={styles.home__imagesFull}>
        <div className={styles.home__imagesFull__image}>
          <figure>
            <ImageLoader
              src={`${accueil.imgPost}`}
              alt={accueil.altImg || accueil.title}
              width={accueil.imgWidth}
              height={accueil.imgHeight}
              srcset={accueil.srcset}
              sizes="(max-width: 768px) 100vw, (min-width: 1270px) 635px, 50vw"
              priority
            />
          </figure>
        </div>
        <div className={styles.home__imagesFull__text}>
          <h1>{accueil.title}</h1>
          <div className={styles['home__imagesFull__text--paragraph']} dangerouslySetInnerHTML={{ __html: accueil.contents }} />
          <DevisButton />
        </div>
      </div>

      <section>

        <h2>Nos spécialités</h2>
        {/* --Services--*/}
        <Cards cards={services} />
        {firstPost && (
        <div key={firstPost.subtitle}>
          <h2>{firstPost.subtitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: firstPost.paragraph }} />
        </div>
        )}

        {otherPosts.map((post) => (
          <div key={post.subtitle}>
            <h2>{post.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.paragraph }} />
          </div>
        ))}
        <div>
          <h2>Ils nous font confiance</h2>
          <div className={styles.page__reviews} />
          <Link href="/Temoignages" className="button">
            Consultez tous nos avis ici
          </Link>
        </div>
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
      <aside>
        <h2>Guide Anti-Nuisibles : Nos Articles Experts</h2>
        <p>
          Nos experts partagent leurs connaissances approfondies pour vous aider
          à identifier et gérer efficacement les nuisibles. Retrouvez nos guides
          pratiques, conseils professionnels et solutions éprouvées..
        </p>
        <Cards cards={blog} />
        <div className="text-center mt-8">
          <Link href="/Articles">
            Découvrir tous nos articles d&apos;experts
          </Link>
        </div>
      </aside>
    </>
  );
}
