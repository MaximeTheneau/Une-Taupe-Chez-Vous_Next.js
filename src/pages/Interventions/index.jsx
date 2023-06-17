/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../components/cards/cards';
import styles from '../../styles/Pages.module.scss';
import { fetcher } from '../../utils/fetcher';
import useSWR from 'swr';

export async function getStaticProps() {
  const responseArticles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Interventions`);

  return {
    props: {
      responseArticles,
      responsePage,
    },
  };
}

export default function Home({ responseArticles, responsePage }) {
  const { data: articlesSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`, fetcher);
  const { data: pageSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Interventions`, fetcher);

  const page = pageSwr || responsePage;
  const articles = articlesSwr || responseArticles;
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Services : Taupes - Fouines - Ragondins " />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Services de capture et d&apos;aposextermination de taupes, fouines et ragondins. Protégez votre propriété contre les dégâts causés par ces animaux nuisibles." />
        <meta property="og:description" content="Services de capture et d&apos;aposextermination de taupes, fouines et ragondins. Protégez votre propriété contre les dégâts causés par ces animaux nuisibles." />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <section>

          <h1>{page.title}</h1>
          <p>
            {page.contents}
          </p>
        </section>
        {/* --Articles--*/}
        <h2>Nos interventions</h2>
        <div className={styles.home}>
          <Cards cards={articles} path="Interventions" />
        </div>

      </>
    </>
  );
}
