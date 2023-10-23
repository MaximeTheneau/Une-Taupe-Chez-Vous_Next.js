import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import fetcher from '../utils/fetcher';
import LocalBusinessJsonLd from '../components/jsonLd/LocalBusinessJsonLd';
import SearchJsonLd from '../components/jsonLd/SearchJsonLd';
import LogoJsonLd from '../components/jsonLd/LogoJsonLd';

export async function getStaticProps() {
  const accueil = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const services = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`);
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`);
  const faq = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const testimonials = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`);
  const keyword = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=keyword&limit=3&id=17 `);

  return {
    props: {
      accueil,
      services,
      articles,
      faq,
      testimonials,
      keyword,
    },
  };
}

export default function Home({
  accueil, services, articles, faq, testimonials, keyword,
}) {
  return (
    <>
      <Head>
        <title>{accueil.title}</title>
        <meta name="description" content={accueil.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={accueil.metaDescription} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
      </Head>
      <LocalBusinessJsonLd descriptionMeta={accueil.metaDescription} />
      <SearchJsonLd />
      <LogoJsonLd
        name="Une taupe chez vous"
        url={process.env.NEXT_PUBLIC_URL}
        logoUrl={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/logo-une-taupe-chez-vous.png`}
      />

      <section className={styles.home}>
        <div className={styles.home__imagesFull}>
          <Image
            src={`${accueil.slug}.webp`}
            alt={accueil.altImg || accueil.title}
            loader={imageLoaderFull}
            quality={100}
            width={1080}
            height={720}
            sizes="(max-width: 640px) 100vw, (max-width: 750px) 750px, (max-width: 828px) 828px, 1080px"
            style={{
              width: '100%',
              height: 'auto',
            }}
            className={styles.home__imagesFull__image}
            priority
          />
          <div className={styles.home__imagesFull__text}>
            <h1>{accueil.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: accueil.contents }} />
          </div>
        </div>

        {/* --Services--*/}

        <div className={styles.home__category}>
          <div className={styles.home__category__title}>
            <Link href="../Interventions">
              <h2>Interventions</h2>
              <span>
                Voir plus
              </span>
            </Link>
          </div>

        </div>
        <Cards cards={services} />
        <h2>Taupier au Service de la Nature</h2>
        <ul className={styles.home__list}>
          {articles.map((article) => (
            <li key={article.title} className={styles.home__list__item}>
              <Link href={`/${article.category.slug}/${article.subcategory.slug}/${article.slug}`}>
                <Image
                  src={`/svg/${article.slug}.svg`}
                  unoptimized
                  alt="icone"
                  width={100}
                  height={100}
                  className={styles.home__list__item__icon}
                />
                <span>
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {accueil.paragraphPosts.map((paragraphPosts) => (
          <div
            key={paragraphPosts.subtitle}
          >
            <h3>{paragraphPosts.subtitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />

          </div>
        ))}
        <div className={styles.home__faq}>
          <Link href={faq.slug}>
            <h2>{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
        </div>
        <h3>Retrouver nos derniers articles :</h3>
        <Cards cards={keyword} />
        <div className={styles.home__testimonials}>
          <h2>
            <Link href={testimonials.slug}>
              {testimonials.title}
            </Link>
          </h2>
          <ul>
            {testimonials.paragraphPosts.map((paragraphTestimonial) => (
              <li
                key={paragraphTestimonial.subtitle}
              >
                <h3>
                  De :
                  {' '}
                  {paragraphTestimonial.subtitle}
                </h3>
                <h4>Notes : ⭐⭐⭐⭐⭐</h4>
                <p>
                  <strong>
                    Avis :
                  </strong>
                  {' '}
                  {paragraphTestimonial.paragraph}
                </p>
              </li>
            ))}
          </ul>
          <Link href="https://goo.gl/maps/8Q9vNCtioX7Nz1BLA" target="_blank">
            Découvrez les avis de nos clients
          </Link>
        </div>
        {accueil.listPosts.map((listArticle) => (
          listArticle.title !== null && (
          <div key={listArticle.title}>
            {listArticle.title && (
            <h2>{listArticle.title}</h2>
            )}
            {listArticle.description && (
            <div dangerouslySetInnerHTML={{ __html: listArticle.description }} />
            )}
          </div>
          )
        ))}

        <button type="button" className="button">
          <Link href="/Contact">
            Contactez-nous
          </Link>
        </button>

      </section>
    </>
  );
}
