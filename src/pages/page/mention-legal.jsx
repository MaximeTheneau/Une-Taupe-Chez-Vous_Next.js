import Head from 'next/head';
import Image from 'next/image';
import styles from './Pages.module.scss';

export async function getStaticProps() {
  const responsePage = await fetch('https://back.unetaupechezvous.fr/public/api/pages/Mentions-Legales');
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function MentionsLegal({ page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure, 0232264958, N° SIRET 39338032400029" />
        <meta property="og:title" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure," />
        <meta property="og:description" content="Une Taupe Chez Vous, 71 rue Marie Curie, 27780 Garrennes Sur Eure, , 0232264958, N° SIRET 39338032400029" />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <section className={styles.page__image}>
          <h1>Qui somme nous</h1>
          <Image
            src={page.imgHeader.path}
            alt={page.title}
            width={page.imgHeader.width}
            height={page.imgHeader.height}
          />
        </section>
        <section>
          <h2>{page.subtitle}</h2>
          <p>
            {page.contents}
          </p>
          {page.contents2 && <p>{page.contents2}</p>}
        </section>
      </>
    </>
  );
}
