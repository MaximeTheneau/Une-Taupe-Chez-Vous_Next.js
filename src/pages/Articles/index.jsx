/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Cards from '../../components/cards/cards';
import Category from '../../components/category/category';
import styles from '../../styles/Pages.module.scss';
import stylesNav from '../../components/category/Category.module.scss';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Articles`);
  const page = await responsePage.json();

  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);
  const articles = await responseArticles.json();

  const responseSubcategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);
  const subcategory = await responseSubcategory.json();
  return {
    props: {
      articles,
      page,
      subcategory,
    },
  };
}

export default function Home({ page, articles, subcategory }) {
  const descriptionMeta = page.contents.substring(0, 165).replace(/[\r\n]+/gm, '');

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <Category category={null} />

        <section>
          <h1>{page.title}</h1>
          <p>{page.contents}</p>
          {/* --Articles--*/}
          <h2>Les derniers articles :</h2>
          <nav>
            <ul className={stylesNav.category}>
              {subcategory.map((category) => (
                <li className="button" key={category.name}>
                  <Link href={`Articles/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.home}>
            <Cards cards={articles} path="Articles" />
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
    </>
  );
}
