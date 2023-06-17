/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Pages.module.scss';
import ScrollParallaxTop from '../hooks/useMovableElement/ScrollParallaxTopWrapper';
import imageLoaderFull from '../utils/imageLoaderFull';
import imageThumbnail from '../utils/imageThumbnail';
import AnimationHover from '../hooks/useHoverAnimation/CloneTextWrapper';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export async function getStaticProps() {
  const accueilInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const servicesInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`);
  const articlesInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`);
  const faqInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);

  return {
    props: {
      accueilInit,
      servicesInit,
      articlesInit,
      faqInit,
    },
  };
}

export default function Home({
  accueilInit, servicesInit, articlesInit, faqInit,
}) {


  const { data: accueilSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`, fetcher
  );
  const { data: servicesSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`,
    { fetcher }
  );
  const { data: articlesSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`,
    { fetcher }
  );
  const { data: faqSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`,
    { fetcher }
  );
  const accueil = accueilSwr || accueilInit;
  const services = servicesSwr || servicesInit;
  const articles = articlesSwr || articlesInit;
  const faq = faqSwr || faqInit;

  const descriptionMeta = 'Taupier professionnels agréé de la lutte contre les taupes, fouines et ragondins. Intervention en Eure (27), Yvelines (78) et Essonne (91). Devis gratuit.';

  // schema.org
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "LocalBusiness",
      "name": "${accueil.title}",
      "image": "${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg",
      "description": "${descriptionMeta}",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "postalCode": "27780",
        "streetAddress": "71 rue marie curie",
        "addressLocality": "Garrenne sur Eure"
      },
      "url": "${process.env.NEXT_PUBLIC_URL}",
      "telephone": "+33232264958",
      "sameAs": [
        "https://www.facebook.com/unetaupechezvous/",
        "https://twitter.com/UneTaupe_",
        "https://www.linkedin.com/company/une-taupe-chez-vous"
      ]      
    }
  `,
    };
  }

  return (
    <>
      <Head>
        <title>{accueil.title}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <section>
        <Image
          src="/Logo-Une-Taupe-Chez-Vous.webp"
          alt="Logo de l'entreprise Une Taupe Chez Vous"
          className={styles.home__imageLogo}
          loader={imageThumbnail}
          width={50}
          height={50}
          sizes="(max-width: 1080px) 100vw, 1080px"
          style={{ width: '100%' }}
          quality={100}
          priority
        />
        <h1>{accueil.title}</h1>
        <p>{accueil.contents}</p>
        {accueil.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2>{paragraphPosts.subtitle}</h2>
            <p>{paragraphPosts.paragraph}</p>
          </>
        ))}
        {/* --Services--*/}
        <div className={styles.home}>
          <div className={styles.home__category}>
            <div className={styles.home__category__title}>
              <h2>Interventions</h2>
              <Link href="../Interventions">
                Voir plus
              </Link>
            </div>
            <ScrollParallaxTop>
              <Image
                src={`${accueil.slug}.webp`}
                alt={accueil.altImg || accueil.title}
                loader={imageLoaderFull}
                quality={90}
                width={1080}
                height={720}
                className={styles.home__category__image}
                sizes="100vw"
                style={{ objectPosition: '0 var(--topImg)' }}
                priority
              />
            </ScrollParallaxTop>
          </div>

          <Cards cards={services} path="Interventions" />
        </div>

        {/* --Articles--*/}

        <div className={styles.home}>
          <div className={styles.home__category} />
          <div className={styles.home__category__title}>
            <h2>Articles</h2>
            <Link href="../Articles">
              Voir plus
            </Link>
          </div>
          <ScrollParallaxTop>
            <Image
              src="Articles.webp"
              alt={accueil.altImg || accueil.title}
              loader={imageLoaderFull}
              quality={100}
              width={1080}
              height={720}
              sizes="100vw"
              className={styles.home__category__image}
              style={{ objectPosition: '0 var(--topImg)' }}
            />
          </ScrollParallaxTop>
          <Cards cards={articles} path="Articles" />
        </div>

        {/* --Contact--*/}
        <div>
          <Link href={faq.slug}>
            <h2 className="title__faqs">{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
        </div>
        <div>
          {accueil.paragraphPosts.map((paragraphArticle) => (
            <>
              <h2>{paragraphArticle.title}</h2>
              <p>{paragraphArticle.description}</p>
            </>
          ))}
          {accueil.listPosts.map((listArticle) => (
            listArticle.title !== null && (
            <div key={listArticle.title}>
              {listArticle.title && (
              <h3>{listArticle.title}</h3>
              )}
              {listArticle.description && (
              <p>{listArticle.description}</p>
              )}
            </div>
            )
          ))}

          <div className="button">
            <Link href="/Contact">
              <AnimationHover>
                Contactez-nous
              </AnimationHover>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
