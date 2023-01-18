import Image from 'next/image';
import Head from 'next/head';
import ContactForm from '../../components/contact/contactForm';
import styles from '../../styles/Pages.module.scss';

export async function getStaticProps() {
  const responseContact = await fetch('https://back.unetaupechezvous.fr/public/api/pages/Contact');
  const page = await responseContact.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function Contact({ page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="{page.title}" />
        <meta property="og:description" content={page.subtitle} />
        <meta property="og:site_name" content="https://unetaupechezvous.fr/page/contact" />
        <meta property="og:image" content={page.imgHeaderJpg} />
        <link
          rel="canonical"
          href="https://unetaupechezvous.fr/page/contact"
          key="canonical"
        />
      </Head>

      <section className={styles.page__image}>
        <h1>{page.title}</h1>
        <Image
          src={page.imgHeader.path}
          alt={page.title}
          width={page.imgHeader.width}
          height={page.imgHeader.height}
        />
      </section>
      <section>
        <h2>
          {page.subtitle}
        </h2>
        <p>
          {page.contents}
        </p>
      </section>
      <section>
        <h2>{page.contents}</h2>
        <ContactForm />
      </section>
    </>
  );
}
