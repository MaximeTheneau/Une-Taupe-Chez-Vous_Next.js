/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import Cards from '../../components/cards/cards';
import styles from '../../styles/Pages.module.scss';
import stylesNav from '../../components/category/Category.module.scss';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';
import fetcher from '../../utils/fetcher';
import CategoryPage from '../../components/category/CategoryPage';

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Articles`);
  const responseArticles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);
  const responseSubcategory = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);
  

  return {
    props: {
      responseArticles,
      responsePage,
      responseSubcategory,
    },
  };
}

export default function Home({ responsePage, responseArticles, responseSubcategory }) {
  const { data: pageData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Articles`, fetcher);
  const { data: articlesData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`, fetcher);
  const { data: subcategoryData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`, fetcher);

  const page = pageData || responsePage;
  const articles = articlesData || responseArticles;
  const subcategoryList = subcategoryData || responseSubcategory;
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <section>
        <h1>{page.title}</h1>
        <CategoryPage category subcategoryList={subcategoryList}/>
        {/* --Articles--*/}
        <h2>Les derniers articles :</h2>

        <div className={styles.home}>
          <Cards cards={articles} />
        </div>
        {page.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2>{paragraphPosts.subtitle}</h2>
            <p>{paragraphPosts.paragraph}</p>
          </>
        ))}
        <div className="button">
          <Link href="/Contact">
            <AnimationHover>
              Contactez-nous
            </AnimationHover>
          </Link>
        </div>
      </section>
    </>
  );
}
