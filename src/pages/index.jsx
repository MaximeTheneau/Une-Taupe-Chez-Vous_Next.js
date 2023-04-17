/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Pages.module.scss';;
import ScrollParallaxTop from '../hooks/useMovableElement/ScrollParallaxTopWrapper';
import imageLoaderFull from '../utils/imageLoaderFull';
import Image from 'next/image';
import imageThumbnail from '../utils/imageThumbnail';


export async function getStaticProps() {
  const responseAccueil = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const accueil = await responseAccueil.json();

  const responseServices = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`);
  const services = await responseServices.json();

  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`);
  const articles = await responseArticles.json();

  const responseFaq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const faq = await responseFaq.json();

  return {
    props: {
      accueil,
      services,
      articles,
      faq,
    },
  };
}

export default function Home({
  accueil, services, articles, faq, reviews,
}) {
  const descriptionMeta = 'Taupier professionnels agréé de la lutte contre les taupes, fouines et ragondins. Intervention en Eure (28), Yvelines (78) et Essonne (91). Devis gratuit.';
  
  // schema.org
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Corporation",
      "name": "${accueil.title}",
      "image": "${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg",
      "description": "${descriptionMeta}",
      "slogan": "${descriptionMeta}",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "postalCode": "27780",
        "streetAddress": "71 rue marie curie",
        "addressLocality": "Garrenne sur Eure"
      },
      "url": "${process.env.NEXT_PUBLIC_URL}",
      "telephone": "+33232264958"
      
    }
  `,
  };
}

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="yObJd5noBtjUBky_GRbOOETV42Q9qAHf7w00PPz1-ss" />
        <title>{accueil.title}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <meta name="google-site-verification" content="yObJd5noBtjUBky_GRbOOETV42Q9qAHf7w00PPz1-ss" />
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
      <>
        <section >

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
              loading='eager'
            />
          <h1>{accueil.title}</h1>
          <p>{accueil.contents}</p>
          <div
            className={styles.home_imageAnimation}
          />
        </section>

        {/* --Services--*/}
        <section className={styles.home} loading="lazy">
          <ScrollParallaxTop
            src={`${accueil.slug}.webp`}
            alt={accueil.altImg || accueil.title}
            loader={imageLoaderFull}
            quality={90}
            width={1080}
            height={720}

          >
            <Link href="../Interventions">
              <h2 className="absoluteTitle">Interventions</h2>
            </Link>
          </ScrollParallaxTop>
          <Cards cards={services} path="Interventions" />
        </section>

        {/* --Articles--*/}

        <section className={styles.home} loading="lazy">
          <ScrollParallaxTop
            src={`articles.webp`}
            alt={accueil.altImg || accueil.title}
            loader={imageLoaderFull}
            quality={100}
            width={1080}
            height={720}
          >
            <Link href="../articles">
              <h2 className="absoluteTitle">Articles</h2>
            </Link>
          </ScrollParallaxTop>
          <Cards cards={articles} path="articles" />
        </section>

        {/* --Contact--*/}
        <section loading="lazy">
          <Link href={faq.slug}>
            <h2 className="title__faqs">{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
        </section>
        <section loading="lazy">
              {accueil.paragraphPosts.map((paragraphArticle) => (
                <>
                  <h2>{paragraphArticle.title}</h2>
                  <p>{paragraphArticle.description}</p>
                </>
                  ))

              }
        </section>
      </>
    </>
  );
}
