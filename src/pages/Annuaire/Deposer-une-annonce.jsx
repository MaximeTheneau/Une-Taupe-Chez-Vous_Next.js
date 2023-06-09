import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Pages.module.scss";
import imageLoaderFull from '../../utils/imageLoaderFull';
import Button from "../../components/button/button";
import AddForm from "../../components/contact/AddForm";


export async function getStaticProps() {

    const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);

    const article = await responseArticles.json();

const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Deposer-une-annonce-gratuitement-faites-connaitre-votre-entreprise`);
const page = await responsePage.json();

return {
    props: {
    page,
    article,
    },
};
}

// == Composant
export default function Page({ page, article }) {
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
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.slug}.jpg`} />
        <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
        key="canonical"
        />
    </Head>

    <>
        <section className={styles.page}>
        <h1>{page.title}</h1>
        {/* <Image
            src={`${page.slug}.webp`}
            alt={page.altImg || page.title}
            width="1080"
            height="720"
            quality={100}
            loader={imageLoaderFull}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
        /> */}
        <p>
            {page.contents}
        </p>
        {page.paragraphPosts.map((paragraphPosts) => (
          <>
            <h2>{paragraphPosts.subtitle}</h2>
            <p>{paragraphPosts.paragraph}</p>
          </>
        ))}

        <AddForm
            article={article}
        />
          <h2>Pour toutes questions suplémentaire</h2>
          <p>Contactez le Webmaster du site, via 
            <a href="/contact"> le formulaire de contact</a>
          </p>

        </section>
    </>
    </>
);
}

