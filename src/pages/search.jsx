import Head from 'next/head';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
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
  const router = useRouter();
  const [articles, setArticles] = useState(articlesInit);
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    const filteredArticles = articlesInit.filter((article) => {
      const searchLowerCase = removeAccents(searchTerm.toLowerCase());
      const lowerCaseTitle = removeAccents(article.title.toLowerCase());
      return lowerCaseTitle.includes(searchLowerCase);
    });
  
    setArticles(filteredArticles);
  };
  useEffect(() => {
    setSearchValue((prevSearchValue) => {
      const querySearchValue = router.query.q || '';
      handleSearch(querySearchValue);
      return querySearchValue;
    });
  }, [router.query.q, articlesInit]);
  
  console.log(searchValue);

  const removeAccents = (str) => {
    return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
  };
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/search`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <meta name="robots" content="noindex,nofollow"/>
        <meta name="googlebot" content="noindex,nofollow"/>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/search`}
          key="canonical"
        />
      </Head>
      <section className={styles.page__contents}>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
        <Search
          onSearch={handleSearch}
        />
        </section>
        <section>
          <h2>Résultats de la recherche :</h2>
          {articles.length > 0 ? (
            <Cards cards={articles} />
            ) : (
            <>
              <h2>Aucun résultat</h2>
              <h3>Les derniers articles :</h3>
              <Cards cards={desc} />
            </>
          )}

        </section>
    </>
  );
}
