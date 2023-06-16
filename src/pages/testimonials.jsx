import Head from "next/head";
import styles from '../styles/Pages.module.scss';
import Link from "next/link";

export async function getStaticProps() {
    const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Temoignages`);
    const page = await responsePage.json();
  
    return {
      props: {
        page,
      },
    };
  }
  // == Composant
export default function testimonials({ page }) {
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
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
          <link
            rel="canonical"
            href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
            key="canonical"
          />
        </Head>
        <section className={styles.page}>
          <h1>{page.title}</h1>
          <p>{page.contents}</p>
          <ul>
          {page.paragraphPosts.map((paragraphPosts) => (
            <li>
              <h2>De : {paragraphPosts.subtitle}</h2>
              <p><strong>Avis :</strong> {paragraphPosts.paragraph}</p>
            </li>
          ))}
          </ul>
        </section>
        </>
    );
    }
