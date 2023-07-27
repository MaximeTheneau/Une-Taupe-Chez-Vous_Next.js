import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Pages.module.scss';
import ScrollParallaxTop from '../hooks/useMovableElement/ScrollParallaxTopWrapper';
import imageLoaderFull from '../utils/imageLoaderFull';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const accueilInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const servicesInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`);
  const articlesInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`);
  const faqInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const testimonialsInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`);

  return {
    props: {
      accueilInit,
      servicesInit,
      articlesInit,
      faqInit,
      testimonialsInit,
    },
  };
}

export default function Home({
  accueilInit, servicesInit, articlesInit, faqInit, testimonialsInit,
}) {
  const { data: accueilSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`, fetcher);
  const { data: servicesSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Interventions`,
    fetcher,
  );
  const { data: articlesSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`,
    fetcher,
  );
  const { data: faqSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`,
    fetcher,
  );
  const { data: testimonialsSwr } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`,
    fetcher,
  );

  const testimonials = testimonialsSwr || testimonialsInit;
  const accueil = accueilSwr || accueilInit;
  const services = servicesSwr || servicesInit;
  const articles = articlesSwr || articlesInit;
  const faq = faqSwr || faqInit;

  const descriptionMeta = 'Taupier professionnels agréé de la lutte contre les taupes, fouines et ragondins. Intervention en Eure (27), Yvelines (78) et Essonne (91). Devis gratuit.';

  // schema.org
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "LocalBusiness",
      "name": "${accueil.title}",
      "image": "${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg",
      "description": "${descriptionMeta}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "${process.env.NEXT_PUBLIC_URL}/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "postalCode": "27780",
        "streetAddress": "71 rue marie curie",
        "addressLocality": "Garrenne sur Eure"
      },
      "url": "${process.env.NEXT_PUBLIC_URL}",
      "telephone": "+33232264958",
      "sameAs": [
        "https://www.facebook.com/unetaupechezvous/",
        "https://twitter.com/UneTaupe_",
        "https://www.linkedin.com/company/une-taupe-chez-vous"
      ]      
    }
  `,
    };
  }

  return (
    <>
      <Head>
        <title>{accueil.title}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <section className={styles.home}>

        <h1>{accueil.title}</h1>
        <p>{accueil.contents}</p>
        {accueil.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2>{paragraphPosts.subtitle}</h2>
            <p>{paragraphPosts.paragraph}</p>
          </>
        ))}
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
          <ScrollParallaxTop>
            <Image
              src={`${accueil.slug}.webp`}
              alt={accueil.altImg || accueil.title}
              loader={imageLoaderFull}
              quality={100}
              fill
              className={styles.home__category__image}
            />
          </ScrollParallaxTop>
        </div>
        <Cards cards={services} />

        <div className={styles.home__list}>
          <h2>
            Taupier professionnel certifié depuis près de 30 ans,
            spécialisé dans la lutte contre les nuisibles tels que
            les taupes, les fouines et les ragondins.
          </h2>
          <ul>
            {articles.map((article) => (
              <li key={article.title} className={styles.home__list__item}>
                <Link href={`/${article.category.slug}/${article.subcategory.slug}/${article.slug}`}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href={faq.slug}>
          <h2 className="title__faqs">{faq.title}</h2>
        </Link>
        <Faq faq={faq} />
        <div className={styles.home__testimonials}>
          <h2>
            <Link href={testimonials.slug}>
              {testimonials.title}
            </Link>
          </h2>
          <ul>
            {testimonials.paragraphPosts.map((paragraphTestimonial) => (
              <li>
                <h3>
                  De :
                  {paragraphTestimonial.subtitle}
                </h3>
                <h4>Notes : ⭐⭐⭐⭐⭐</h4>
                <p>
                  <strong>
                    Avis :
                  </strong>
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
              <p>{listArticle.description}</p>
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
