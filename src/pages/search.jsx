import Head from 'next/head';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import Cards from '../components/cards/cards';
import styles from '../styles/Pages.module.scss';

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
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState(articlesInit);

  useEffect(() => {
    setSearchValue(router.query.q);
  }, [router.query.q]);

  const removeAccents = (str) => str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const handleChange = (event) => {
    setSearchValue(event);
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

  console.log(articles.length > 0);
  return (
    <>
      <Head>
        <title>{page.title}</title>
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
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Rechercher..."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            // onClick={() => setSearchValue('')}
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
        </section>
        <section>
          <h2>Résultats de la recherche :</h2>
          {articles && (
              <Cards cards={articles} />
            )}
          {articles.length === 0 && (
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
