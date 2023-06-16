import Head from "next/head";
import styles from '../styles/Pages.module.scss';
import Link from "next/link";

export async function getStaticProps() {
    const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Tarifs`);
    const page = await responsePage.json();
  
    return {
      props: {
        page,
      },
    };
  }
  // == Composant
export default function pricing({ page }) {
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
          {page.paragraphPosts.map((paragraphPosts) => (
            <>
              <p className={styles.page__contents__paragraph}>
                {paragraphPosts.imgPostParagh && (
                  <Image
                    className={styles.page__contents__paragraph}
                    src={`${paragraphPosts.imgPostParagh}.webp`}
                    alt={paragraphPosts.altImg || paragraphPosts.subtitle}
                    width={330}
                    height={310}
                    quality={70}
                  />
                )}
                {page.contents}
              </p>
              <h2>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
                <p>
                 <Link href="/Contact">Contactez-nous</Link>
                 maintenant pour planifier une intervention ou pour obtenir plus d'informations sur nos tarifs compétitifs et nos services de lutte contre les nuisibles.
                </p>
            </>
          ))}
        </section>
        </>
    );
    }
