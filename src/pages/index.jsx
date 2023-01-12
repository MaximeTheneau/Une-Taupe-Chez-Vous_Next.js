import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Une Taupe Chez Vous Taupier Proféssionel Yvelyne (78)</title>
        <meta name="description" content="Une Taupe Chez Vous Artisant Maître Taupiers depuis presque 30 ans. Intervient en yvelynes (78), pour les nuisibles comme les taupes, ragondin, fouines, etc..." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tererer" />
        <meta property="og:description" content="rerre" />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <meta property="og:image" content="/rer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="home-title">Une Taupe Chez vous</h1>
      <h2 className="home-subtitle">Artisans Maitre Taupiers piégeurs</h2>
      <p className="home-paragrah">
        nous mettons à vote service plus de 25 ans d'expérience dans la
        destruction des
        <Link href="/services/nuisibles/taupe">taupes</Link>
        ,
        <Link href="/services/nuisibles/fouines"> fouines</Link>
        ,
        <Link href="/services/nuisibles/ragondin"> ragondins</Link>
        {' '}
        et autres
        nuisibles qui envahissent votre jardin.
      </p>
      {/* --home-list--*/}
      <div className="home-cards">
        {/* --home-card--*/}
        <div className="home-card">
          <div className="home-card_img">
            {/* <Environment /> */}
          </div>
          <div className="home-card_description">
            <h3>Sans danger pour l'environnement</h3>
          </div>
        </div>
        {/* --home-card--*/}
        <div className="home-card">
          <div className="home-card_img">
            {/* <Certified /> */}
          </div>
          <div className="home-card_description">
            <h3>Piégeur Agréé</h3>
          </div>
        </div>
        {/* --home-card--*/}
        <div className="home-card">
          <div className="home-card_img">
            {/* <Trap /> */}
          </div>
          <div className="home-card_description">
            <h3>Piéges sans danger pour les animaux de compagnie</h3>
          </div>
        </div>
      </div>
      {/* --home-list-services--*/}
      <div className="home-list-services">
        <h2 className="home-list-services_title">Nos services</h2>
        <div className="home-cards">
          {/* --home-service--*/}
          <div className="home-card-service">
            <Link href="/services/taupe">
              <div className="home-list-services_list_img">
                {/* <Taupe /> */}
              </div>
              <h3 className="home-card-service_title">Taupes</h3>
            </Link>
          </div>
          {/* --home-service--*/}
          <div className="home-card-service">
            <Link href="/services/fouine">
              <div className="home-list-services_list_img">
                {/* <Fouine /> */}
              </div>
              <h3 className="home-card-service_title">Fouines</h3>
            </Link>
          </div>
          {/* --home-service--*/}
          <div className="home-card-service">
            <Link href="/services/ragondin">
              <div className="home-services_list_img">
                {/* <Ragondin /> */}
              </div>
              <h3 className="home-card-service_title">Ragondins</h3>
            </Link>
          </div>
        </div>
      </div>
      {/* --home-Map--*/}
      <h3>Interventions en Yvelynes (78)</h3>
      <div className="home-map">
        <div className="home-map_description">
          <p>
            Pour tous demande de devis ou demande de renseignement
            <Link href="/contact"> contactez-nous</Link>
          </p>
        </div>
        <div className="home-map_img">
          {/* <MapSvg /> */}
        </div>
      </div>
    </>
  );
}
