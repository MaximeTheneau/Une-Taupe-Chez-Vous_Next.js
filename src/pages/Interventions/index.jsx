/* eslint-disable quote-props */
import Head from 'next/head';
import useSWR from 'swr';
import Cards from '../../components/cards/cards';
import styles from '../../styles/Pages.module.scss';
import fetcher from '../../utils/fetcher';

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

  const descriptionMeta = page.contents.substring(0, 150);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
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
          <Cards cards={articles} />
        </div>

      </>
    </>
  );
}
