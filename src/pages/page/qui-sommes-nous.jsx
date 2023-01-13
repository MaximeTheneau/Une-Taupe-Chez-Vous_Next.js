import Head from 'next/head';

// == Composant
export default function QuiSommesNous() {
  return (
    <>
      <Head>
        <title>Qui somme nous</title>
        <meta name="description" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure, 0232264958, N° SIRET 39338032400029" />
        <meta property="og:title" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure," />
        <meta property="og:description" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure, , 0232264958, N° SIRET 39338032400029" />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mentions">
        <h1>Qui somme nous</h1>
      </div>
    </>
  );
}
