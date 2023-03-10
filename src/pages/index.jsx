/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Pages.module.scss';;
import ScrollParallaxTop from '../hooks/useMovableElement/ScrollParallaxTopWrapper';
import CloneTextWrapper from '../hooks/useHoverAnimation/CloneTextWrapper';
import SlideTransition from '../hooks/useSlideTransition/SlideTransition';

export async function getStaticProps() {
  const responseAccueil = await fetch('https://back.unetaupechezvous.fr/public/api/pages/Accueil');
  const accueil = await responseAccueil.json();

  const responseServices = await fetch('https://back.unetaupechezvous.fr/public/api/posts');
  const services = await responseServices.json();

  const responseArticles = await fetch('https://back.unetaupechezvous.fr/public/api/articles');
  const articles = await responseArticles.json();

  const responseFaq = await fetch('https://back.unetaupechezvous.fr/public/api/faq');
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
  accueil, services, articles, faq,
}) {
  const descriptionMeta = accueil.contents.substring(0, 155).replace(/[\r\n]+/gm, '');
  const jsonData = { 
    context: 'https://schema.org',
    type: 'Organization',
    name: 'Une taupe chez vous',
    url: 'https://unetaupechezvous.fr',
    logo: `${accueil.imgHeaderJpg}`,
    sameA: [
      'https://www.facebook.com/Une-Taupe-Chez-Vous',
      'https://www.linkedin.com/company/unetaupechezvous/',
    ],
  };
  return (
    <>
      <Head>
        <title>{accueil.title}</title>
        <meta name="description" content={accueil.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <meta property="og:image" content={accueil.imgHeaderJpg} />
        <link
          rel="canonical"
          href="https://unetaupechezvous.fr/"
          key="canonical"
        />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
        id="jsonld-schema"
      />
      <>
        <section>

          <h1>{accueil.title}</h1>
          <p>{accueil.contents}</p>
          <div
            className={styles.home_imageAnimation}
          />
        </section>

        {/* --Services--*/}
        <section className={styles.home}>
          <ScrollParallaxTop
            src={accueil.imgHeader.path}
            alt={`Image de ${accueil.title}`}
            width={accueil.imgHeader.width}
            height={accueil.imgHeader.height}
          >
            <h2 className="absoluteTitle">Nos services</h2>
          </ScrollParallaxTop>
          <Cards cards={services} name="services" />
        </section>

        {/* --Articles--*/}

        <section className={styles.home}>
          <ScrollParallaxTop
            src={accueil.imgHeader2.path}
            alt={`Image de ${accueil.title}`}
            width={accueil.imgHeader2.width}
            height={accueil.imgHeader2.height}
          >
            <h2 className="absoluteTitle">{accueil.subtitle}</h2>
          </ScrollParallaxTop>
          <Cards cards={articles} name="articles" />
        </section>

        {/* --Contact--*/}
        <section>
          <h2 className="title__faqs">Foire aux questions :</h2>
          <Faq faq={faq} />
        </section>
        <section>
          <SlideTransition>
            <h2>Interventions en Yvelynes (78)</h2>
            <p>
              {accueil.contents2}
            </p>
            <Link href="/contact">
              <button
                className="button"
                type="button"
              >
                <CloneTextWrapper>
                  Contactez-nous
                </CloneTextWrapper>
              </button>
            </Link>
          </SlideTransition>
        </section>
      </>
    </>
  );
}
