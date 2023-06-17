
import Head from 'next/head';
import styles from '../components/cards/Card.module.scss';
import Image from 'next/image';
import imageLoaderFull from '../utils/imageLoaderFull';
import imageThumbnail from '../utils/imageThumbnail';
import Link from 'next/link';
import SlideTransition from '../hooks/useSlideTransition/SlideTransition';
import { useState } from 'react';
import SearchBar from '../components/search/SearchBar';

export async function getStaticProps() {
  const responseAll = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/all`);
  const articles = await responseAll.json();
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Page-de-recherche`);
  const page = await responsePage.json();

  return {
    props: {
      page,
      articles,
    },
  };
}

export default function search({ page, articles,  }) {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const filteredArticles = articles.filter((article) => {
    return article.title.toLowerCase().includes(searchValue.toLowerCase());
  });


  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPosts}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <>
      <section className={styles.page__contents}>
          <h1>{page.title}</h1>
          <p>{page.contents}</p>
          <SearchBar onSearch={setSearchValue} />

          <div className={styles.page__contents__cards}>
            {filteredArticles.length === 0 && (
              <p className={styles.page__contents__cards__noResult}>
                Aucun résultat pour votre recherche
              </p>
            )}
            <ul className={styles.cards}>
            {filteredArticles
              .filter((article) => article.category.name === 'Interventions')
              .map((article) => (
                <SlideTransition className={styles.card} >
                <Link href={`/Annuaire/${article.slug}`}>
                  <Image
                    src={`${article.imgPost}.webp`}
                    alt={article.altImg || article.title}
                    width={330}
                    height={310}
                    loader={imageThumbnail}
                    quality={70}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <h3 className={styles.card__content}>{article.title}</h3>
                </Link>
              </SlideTransition>
              ))
              }
            {filteredArticles
            .filter((article) => article.category.name === 'Articles')
            .map((article) => (
              <SlideTransition className={styles.card} >
              <Link href={`/${article.category.slug}/${article.subcategory.slug}/${article.slug}`}>
                <Image
                  src={`${article.imgPost}.webp`}
                  alt={article.altImg || article.title}
                  width={330}
                  height={310}
                  loader={imageThumbnail}
                  quality={70}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
                <h3 className={styles.card__content}>{article.title}</h3>
              </Link>
            </SlideTransition>
            ))}
            {filteredArticles
              .filter((article) => article.category.name === 'Pages' && article.slug !== 'Inscription-annuaire-gratuite')
              .map((article) => (
                <SlideTransition className={styles.card} >
                <Link href={`/${article.slug}`}>
                  <Image
                    src={`${article.imgPost}.webp`}
                    alt={article.altImg || article.title}
                    width={330}
                    height={310}
                    loader={imageThumbnail}
                    quality={70}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <h3 className={styles.card__content}>{article.title}</h3>
                </Link>
              </SlideTransition>
              ))
            }
            {filteredArticles
              .filter((article) => article.category.name === 'Annuaire' || article.slug === 'Inscription-annuaire-gratuite' )
              .map((article) => (
                <SlideTransition className={styles.card} >
                <Link href={`/Annuaire/${article.slug}`}>
                  <Image
                    src={`${article.imgPost}.webp`}
                    alt={article.altImg || article.title}
                    width={330}
                    height={310}
                    loader={imageThumbnail}
                    quality={70}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <h3 className={styles.card__content}>{article.title}</h3>
                </Link>
              </SlideTransition>
              ))
              }
            </ul>
          </div>        
      </section>
      </>
    </>
  );
}
