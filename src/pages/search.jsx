import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Router, { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import Cards from '../components/cards/cards';
import styles from '../components/search/Search.module.scss';

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/search`);
  const responseArticles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/all`);
  const responseDesc = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&filter=desc&category=articles`);

  return {
    props: {
      responsePage,
      responseArticles,
      responseDesc,
    },
  };
}

export default function Recherche({ responsePage, responseArticles, responseDesc }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState(['']);
  const { data: dataPage } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/search`, fetcher);
  const { data: dataArticles } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/all`, fetcher);
  const { data: dataDesc } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&filter=desc&category=articles`, fetcher);

  const page = dataPage || responsePage;
  const articlesInit = dataArticles || responseArticles;
  const desc = dataDesc || responseDesc;

  useEffect(() => {
    setArticles(articlesInit);
    setSearchValue(router.query.q || 'taupe');
  }, [router.query.q]);

  const removeAccents = (str) => str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const handleChange = (event) => {
    setSearchValue(event);
    console.log(removeAccents(event.toLowerCase()));
    const filteredArticles = articlesInit.filter((article) => {
      const searchLowerCase = removeAccents(event.toLowerCase());
      const lowerCaseTitle = removeAccents(article.title.toLowerCase());
      return (
        searchLowerCase.length > 0
        && lowerCaseTitle.includes(searchLowerCase)
      );
    });
    setArticles(filteredArticles);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    Router.push(`/search/?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta name="description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/search`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/search`}
          key="canonical"
        />
      </Head>

      <section className={styles.page__contents}>
        <h1>{page.title}</h1>
        <p>{page.contents}</p>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Rechercher..."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onClick={() => setSearchValue('')}
            value={searchValue}

          />
          <button
            id="button"
            type="submit"
            tabIndex={0}
            aria-label="Rechercher une page ou un article"
          >
            <i className="icon-paper-plane" />
          </button>
        </form>

        {articles.length ? (
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
