import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cards from '../components/cards/cards';
import styles from '../styles/Home.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import fetcher from '../utils/fetcher';
import LocalBusinessJsonLd from '../components/jsonLd/LocalBusinessJsonLd';
import SearchJsonLd from '../components/jsonLd/SearchJsonLd';
import LogoJsonLd from '../components/jsonLd/LogoJsonLd';
import fetcherImage from '../utils/fetcherImage';
import DevisButton from '../components/button/DevisButton';

export async function getStaticProps() {
  const accueil = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const services = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`);
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`);
  const faq = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const testimonials = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`);
  const keyword = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=keyword&limit=3&id=17 `);
  const image = await fetcherImage(accueil.imgPost);

  return {
    props: {
      accueil,
      services,
      articles,
      faq,
      testimonials,
      keyword,
      image: image.input,
    },
  };
}

export default function Home({
  accueil, services, articles, testimonials, keyword, image,
}) {
  return (
    <>
      <Head>
        <title>{accueil.heading}</title>
        <meta name="description" content={accueil.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={accueil.metaDescription} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
      </Head>
      <LocalBusinessJsonLd descriptionMeta={accueil.metaDescription} />
      <SearchJsonLd />
      <LogoJsonLd
        name="Une taupe chez vous"
        url={process.env.NEXT_PUBLIC_URL}
        logoUrl={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/logo-une-taupe-chez-vous.png`}
      />
      <div className={styles.home__imagesFull}>
        <Image
          src="Accueil.webp"
          alt={accueil.altImg || accueil.title}
          loader={imageLoaderFull}
          quality={80}
          width={image.width}
          height={image.height}
          style={{
            width: '100%',
            height: 'auto',
          }}
          className={styles.home__imagesFull__image}
          priority
        />
        <div className={styles.home__imagesFull__text}>
          <h1>{accueil.title}</h1>
          <div className={styles['home__imagesFull__text--paragraph']} dangerouslySetInnerHTML={{ __html: accueil.contentsHTML }} />
          <DevisButton />
        </div>
      </div>
      <section className={styles.home}>
        {/* --Services--*/}
        <div className={styles.home__category}>
          <div className={styles.home__category__title}>
            <Link href="../Interventions">
              <h2>Interventions</h2>
              <span>
                Voir plus
              </span>
            </Link>
          </div>
        </div>
        <Cards cards={services} />
        <h2>Taupier au Service de la Nature</h2>
        <p>
          Optez pour un piégeur agréé qui œuvre en harmonie avec la nature.
          Nos interventions sont conçues pour être sans danger pour
          l&apos;environnement et respectueuses des animaux de compagnie.
          Faites confiance à notre expertise pour préserver la biodiversité
          de votre jardin tout en assurant un contrôle efficace des taupes.
        </p>
        <ul className={styles.home__list}>
          {articles.map((article) => (
            <li key={article.title} className={styles.home__list__item}>
              <Link href={`/${article.category.slug}/${article.subcategory.slug}/${article.slug}`}>
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
        {accueil.paragraphPosts.map((paragraphPosts) => (
          <div
            key={paragraphPosts.subtitle}
          >
            <h2>{paragraphPosts.subtitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
          </div>
        ))}
        {/* <div className={styles.home__faq}>
          <Link href={faq.slug}>
            <h2>{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
        </div> */}
        <h2>
          <Link href={testimonials.slug}>
            {testimonials.title}
            {' '}
            de Clients Satisfaits
          </Link>
        </h2>
        <p>
          Chez
          <strong>Une Taupe Chez Vous</strong>
          , la satisfaction de nos clients est notre plus grande récompense.
          Découvrez ce que nos clients ont à dire sur notre service de lutte
          antinuisible, dirigé par l&apos;expert taupier
          piégeur,
          <strong>Laurent Theneau</strong>
          .
        </p>
        <div dangerouslySetInnerHTML={{ __html: testimonials.paragraphPosts[0].paragraph }} className="overflow-x-auto" />
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
        <DevisButton />
      </section>
      <section>
        <h2>Découvrez aussi nos articles :</h2>
        <Cards cards={keyword} />
      </section>
    </>
  );
}
