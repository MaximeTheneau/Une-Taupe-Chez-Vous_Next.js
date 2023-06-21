import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '../../styles/Pages.module.scss';
import Page404 from '../404';
import imageLoaderFull from '../../utils/imageLoaderFull';
import { fetcher } from '../../utils/fetcher';
import TableOfContents from '../../components/tableOfContents/TableOfContents';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postInit = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);

  return { props: { postInit }, revalidate: 10 };
}

export default function Slug({ postInit }) {
  const { data: postData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/${postInit.slug}`, fetcher);

  const post = postData || postInit;
  console.log(post);

  const descriptionMeta = post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');

  const postsLinks = post.listPosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description?.replace(
      /Localisation/gi,
      '<strong>Localisation</strong>',
    ).replace(
      /Site web/gi,
      '<strong>Site web</strong>',
    ).replace(
      /Services/gi,
      '<strong>Services</strong>',
    ).replace(
      /(https?:\/\/)([^\s]+)/g,
      '<a href="$1$2" target="_blank">$2</a>',
    ),
  }));

  // schema.org
  function addProductJsonLd() {
    return {
      __html: `{
    "@context": "https://schema.org/",
    "@type": "Article",
    "name": "${post.title}",
    "headline": "${post.title}",
    "description": "${descriptionMeta}",
    "image": "${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg",
    "datePublished": "${post.createdAt}",
    "dateModified": "${post.updatedAt}",
    "author": {
      "@type": "Person",
      "name": "Laurent THENEAU"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Une taupe chez vous",
      "logo": {
        "@type": "ImageObject",
        "url": "${process.env.NEXT_PUBLIC_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Logo-Une-Taupe-Chez-Vous.jpg"
      }
    }
  }
`,
    };
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`}
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <div className={styles.page}>
        <div className={styles.page__image}>

          <Image
            src={`${post.slug}.webp`}
            alt={post.altImg || post.title}
            loader={imageLoaderFull}
            quality={100}
            width="1080"
            height="720"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
          <TableOfContents post={post} />
          {post.paragraphPosts.map((paragraphPosts) => (
            <>
              <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
          ))}

          <h2>Listes des Taupiers près de chez vous :</h2>
          <ul>
            {postsLinks.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: post.description }} />
              </li>
            ))}
          </ul>
          <h2>Référencez-vous gratuitement en tant que professionnel </h2>
          <p>
            Vous êtes un professionnel de la taupe et vous souhaitez être référencé gratuitement sur notre site ?
          </p>
          <Link href="/Annuaire/Inscription-annuaire-gratuite" className="stronk">
            Inscrivez vôtre entreprise gratuitement
          </Link>
        </div>
      </div>

    </>
  );
}

Slug.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    contents2: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    imgPost: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    imgPost2: PropTypes.shape({
      path: PropTypes.string,
    }),
    imgPost3: PropTypes.shape({
      path: PropTypes.string,
    }),
    imgPost4: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
};
