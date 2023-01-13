import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Home.module.scss';

export async function getStaticProps() {
  const responseAccueil = await fetch('http://localhost:8000/api/pages/Accueil');
  const accueil = await responseAccueil.json();

  const responseServices = await fetch('http://localhost:8000/api/posts');
  const services = await responseServices.json();

  const responseArticles = await fetch('http://localhost:8000/api/articles');
  const articles = await responseArticles.json();

  const responseFaq = await fetch('http://localhost:8000/api/faq');
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

export default function Home({ accueil, services, articles, faq }) {
  console.log(accueil);
  return (
    <>
      <Head>
        <title>{accueil.title}</title>
        <meta name="description" content={accueil.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tererer" />
        <meta property="og:description" content="rerre" />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <meta property="og:image" content={accueil.imgHeaderJpg} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home}>

        <h1>{accueil.title}</h1>
        <h2>{accueil.subtitle}</h2>

        <div
          className={styles.home_imageAnimation}
        >
          <Image
            src={accueil.imgHeader.path}
            alt={`Image de ${accueil.title}`}
            width={accueil.imgHeader.width}
            height={accueil.imgHeader.height}
            sizes="100vw"
          />
        </div>

        {/* --Services--*/}
        <Cards cards={services} name="services" />

        <Image
          src={accueil.imgHeader2.path}
          alt={`Image de ${accueil.title}`}
          width={accueil.imgHeader2.width}
          height={accueil.imgHeader2.height}
        />

        {/* --Articles--*/}
        <Cards cards={articles} name="articles" />


        {/* --Contact--*/}
        <h2>Interventions en Yvelynes (78)</h2>
        <div className="home-map">
          <div className="home-map_description">
            <p>
              Pour tous demande de devis ou demande de renseignement
              <Link href="/contact">
                <button type="button">Contactez-nous</button>
              </Link>
            </p>
          </div>
          <div>
            <Faq faq={faq} />
          </div>
        </div>
      </div>
    </>
  );
}
