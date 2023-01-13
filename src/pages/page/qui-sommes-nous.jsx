import Head from 'next/head';
import Image from 'next/image';

export async function getStaticProps() {
  const responsePage = await fetch('http://localhost:8000/api/pages/Qui-sommes-nous');
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}
// == Composant
export default function QuiSommesNous({ page }) {
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

      <div>
        <h1>Qui somme nous</h1>
        <div>
          <Image
            src={page.imgHeader.path}
            alt={page.title}
            width={page.imgHeader.width}
            height={page.imgHeader.height}
          />
        </div>
        <h2>{page.subtitle}</h2>
        <p>
          {page.contents}
        </p>
        {page.contents2 && <p>{page.contents2}</p>}
      </div>
    </>
  );
}
