/* eslint-disable quote-props */
import Head from 'next/head';
import useSWR from 'swr';
import Cards from '../../../components/cards/cards';
import Category from '../../../components/category/category';
import styles from '../../../styles/Pages.module.scss';
import Page404 from '../../404';
import { fetcher } from '../../../utils/fetcher';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {
      subcategory: post.subcategory.slug,
    },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { subcategory } = params;

  const responseArticles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&subcategory=${subcategory}`);
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Sous-categories`);

  return {
    props: {
      responseArticles,
      responsePage,
    },
    revalidate: 10,
  };
}

export default function Home({ responseArticles, responsePage }) {
  const { subcategory } = responseArticles[0];

  const { data: articlesData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&subcategory=${subcategory.slug}`, fetcher);
  const { data: pageData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Sous-categories`, fetcher);

  const articles = articlesData || responseArticles;
  const page = pageData || responsePage;

  const descriptionMeta = page.contents.substring(0, 155).replace(/[\r\n]+/gm, '');
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.category.slug}/${page.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.category.slug}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.category.slug}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <Category category={subcategory} />
        <section>
          <h1>{subcategory.name}</h1>
          <p>{page.contents}</p>
        </section>
        {/* --Articles--*/}
        <h2>Les derniers articles :</h2>
        <div className={styles.home}>
          <Cards cards={articles} />
        </div>

      </>
    </>
  );
}
