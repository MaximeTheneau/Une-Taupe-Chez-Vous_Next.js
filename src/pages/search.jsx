import Head from 'next/head';
import { useState } from 'react';
import fetcher from '../utils/fetcher';
import Cards from '../components/cards/cards';
import styles from '../components/search/Search.module.scss';
import Search from '../components/search/Search';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/search`);
  const articlesInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/all`);
  const desc = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&filter=desc&category=articles`);

  return {
    props: {
      page,
      articlesInit,
      desc,
    },
  };
}

export default function Recherche({ page, articlesInit, desc }) {
  const [articles] = useState(articlesInit);
  const [filteredArticles, setFilteredArticles] = useState(articlesInit);
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/search`}
          key="canonical"
        />
      </Head>
      <section className={styles.search}>
        <Search
          articles={articles}
          setFilteredArticles={setFilteredArticles}
        />
      </section>
      <section>
        <h2>
          {filteredArticles.length}
          {' '}
          résultat(s)
        </h2>
        {filteredArticles.length > 0 ? (
          <Cards cards={filteredArticles} />
        ) : (
          <>
            <h3>Les derniers articles :</h3>
            <Cards cards={desc} />
          </>
        )}
      </section>
    </>
  );
}
