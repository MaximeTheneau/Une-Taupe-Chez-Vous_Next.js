import Head from 'next/head';

// == Composant
export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Head>
        <title>Mention légal</title>
        <meta name="description" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure, 0232264958, N° SIRET 39338032400029" />
        <meta property="og:title" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure," />
        <meta property="og:description" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure, , 0232264958, N° SIRET 39338032400029" />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mentions">
        <h1>Mentions-légal</h1>
        <ul>
          <li className="list-mentions">
            <i className="icon-location" />
            <p>
              Une Taupe Chez Vous,
              <br />
              71 rue Marie Curie,
              <br />
              27780 Garenne Sur Eure
            </p>
          </li>
          <li className="list-mentions">
            <i className="icon-phone" />
            <p>+33 2 32 26 49 58</p>
          </li>
          <li className="list-mentions">
            <p>N° SIRET : 39338032400029</p>
          </li>
        </ul>
        <h2>Cookies</h2>
        <p>Cookies strictement nécessaires à l’utilisation du service demandé.</p>
        <p>
          Ils permettent l’utilisation des principales fonctionnalités du site,
          comme le cas échéant l’accès à votre compte personnel, ou encore de
          mémoriser les préférences d'affichage de votre terminal (langue,
          paramètres d'affichage) et d'en tenir compte lors de vos visites, selon
          la charte graphique et les logiciels de visualisation ou de lecture de
          votre terminal. Ils peuvent inclure des cookies de réseaux sociaux
          lorsque vous interagissez avec ces derniers. Ils nous permettent aussi
          de lier entre elles les différentes pages consultées pour vous assurer
          une navigation fluide.
        </p>
        <p>
          Vous pouvez désactiver complètement les cookies dans votre navigateur.
          Dans ce cas notre site ne fonctionnera plus normalement mais vous
          pourrez quand même effectuer des actions basiques.
        </p>
      </div>
    </>
  );
}
