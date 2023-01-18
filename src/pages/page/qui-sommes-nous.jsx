import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Pages.module.scss';;

export async function getStaticProps() {
  const responsePage = await fetch('https://back.unetaupechezvous.fr/public/api/pages/Qui-sommes-nous');
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
        <title>{page.title}</title>
        <meta name="description" content={page.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="{page.title}" />
        <meta property="og:description" content={page.subtitle} />
        <meta property="og:site_name" content="https://unetaupechezvous.fr" />
        <meta property="og:image" content={page.imgHeaderJpg} />
        <link
          rel="canonical"
          href="https://unetaupechezvous.fr/page/qui-sommes-nous"
          key="canonical"
        />
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
