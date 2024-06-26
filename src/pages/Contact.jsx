import Head from 'next/head';
import Link from 'next/link';
import ContactForm from '../components/contact/ContactForm';
import styles from '../styles/Pages.module.scss';
import NotCopie from '../components/notCopie/NotCopie';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Contact`);

  return {
    props: {
      page,
    },
  };
}

export default function Contact({ page }) {
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <section className={styles.page}>
        <h1>{page.title}</h1>
        <div className={styles.page__contact__block} itemScope itemType="https://schema.org/">
          {' '}
          <p>
            <strong>Société : </strong>
            <span itemProp="name">Une Taupe Chez Vous </span>
          </p>
          <p itemProp="address">
            <strong>Adresse : </strong>
            <span itemProp="streetAddress">71 Marie Curie </span>
            <span itemProp="postalCode">27780 </span>
            <span itemProp="addressLocality">Garennes-Sur-Eure </span>
          </p>
          <p itemProp="telephone">
            <strong>Téléphone : </strong>
            <Link href="tel:+33232264958"> 02 32 26 49 58</Link>
          </p>
          <NotCopie />
        </div>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <div className={styles.page__contact}>
          <div className={styles.page__contact__block}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
