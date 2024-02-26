/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../../components/cards/cards';
import styles from '../../../styles/Pages.module.scss';
import fetcher from '../../../utils/fetcher';
import CategoryPage from '../../../components/category/CategoryPage';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {
      subcategory: post.subcategory.slug,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { subcategory } = params;

  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&subcategory=${subcategory}`);
  const subcategoryList = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);

  return {
    props: {
      articles,
      subcategoryList,
    },
  };
}

export default function Home({ articles, subcategoryList }) {
  const { subcategory } = articles[0];

  const urlPost = `${process.env.NEXT_PUBLIC_URL}/Articles/${subcategory.slug}`;
  return (
    <>
      <Head>
        <title>{subcategory.name}</title>
        <meta name="description" content={`${subcategory.name} : Retrouvez tous les articles`} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={subcategory.name} />
        <meta property="og:description" content={`${subcategory.name} : Retrouvez tous les articles`} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={urlPost} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="720" />
        <meta property="article:section" content={subcategory.name} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={subcategory.name} />
        <meta property="twitter:description" content={`${subcategory.name} : Retrouvez tous les articles`} />
        <meta property="twitter:site" content="@UneTaupe_" />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={`${subcategory.name} : Retrouvez tous les articles`} />
        <meta property="twitter:domain" content={urlPost} />
        <meta property="twitter:url" content={urlPost} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/Articles/${subcategory.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <section>
          <h1>{subcategory.name}</h1>
          <CategoryPage
            category={false}
            subcategoryPost={subcategory.name}
            subcategoryList={subcategoryList}
          />
        </section>
        <section>
          {/* --Articles--*/}
          <h2>Les derniers articles :</h2>
          <div className={styles.home}>
            <Cards cards={articles} />
          </div>
        </section>
      </>
    </>
  );
}
