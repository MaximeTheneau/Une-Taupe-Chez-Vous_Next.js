import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '../../styles/Pages.module.scss';
import imageLoaderFull from '../../utils/imageLoaderFull';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import fetcher from '../../utils/fetcher';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Interventions`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const responsePosts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);

  return { props: { responsePosts }, revalidate: 10 };
}

export default function Slug({ responsePosts }) {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/${responsePosts.slug}`);

  const post = data || responsePosts;

  const descriptionMeta = post.contents && post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');

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
          <Link href="/Contact" className="button">
            Contactez-nous
          </Link>
        </div>
      </div>

    </>
  );
}

// Slug.propTypes = {
//   post: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     subtitle: PropTypes.string.isRequired,
//     contents: PropTypes.string.isRequired,
//     contents2: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     updatedAt: PropTypes.string.isRequired,
//     createdAt: PropTypes.string.isRequired,
//     imgPost: PropTypes.shape({
//       path: PropTypes.string.isRequired,
//     }),
//     imgPost2: PropTypes.shape({
//       path: PropTypes.string,
//     }),
//     imgPost3: PropTypes.shape({
//       path: PropTypes.string,
//     }),
//     imgPost4: PropTypes.shape({
//       path: PropTypes.string,
//     }),
//   }).isRequired,
// };
