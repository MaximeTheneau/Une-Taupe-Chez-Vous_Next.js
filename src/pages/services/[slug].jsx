import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from '../../styles/Pages.module.scss';
import Page404 from '../404';

export async function getStaticPaths() {

  const res = await fetch('https://back.unetaupechezvous.fr/public/api/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://back.unetaupechezvous.fr/public/api/posts/${params.slug}`);
  const post = await res.json();

  return { props: { post },revalidate: 10 };
}

export default function Slug({ post }) {
  
  if(!post) return <Page404 />

  const descriptionMeta = post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');
  const handleChangeShareSocial = (e) => {
    const social = e.target.value;
    if (social === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'email') {
      window.open(`mailto:?subject=${post.title}&body=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    }
  };
  const jsonData = {
    context: 'https://schema.org',
    type: 'service',
    name: post.title,
    description: descriptionMeta,
    image: post.slug+'.jpg',
    url: `${process.env.NEXT_PUBLIC_URL}/${post.slug}`,
    provider: {
      type: 'Organization',
      name: 'Une taupe chez vous',
      id: process.env.NEXT_PUBLIC_URL,
      url: process.env.NEXT_PUBLIC_URL,
    },
    serviceProvider: {
      type: 'Service',
      name: 'Une taupe chez vous',
      id: `${process.env.NEXT_PUBLIC_URL}/${post.slug}`,
    },
  };
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.slug}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`}
          key="canonical"
        />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
        id="jsonld-schema"
      />
      <div className={styles.page}>
        <div className={styles.page__image}>
          <h1>{post.title}</h1>
          <Image
            src={`${post.slug}.webp`}
            alt={post.title}
            width='1080'
            height='720'
            sizes='(max-width: 1080px) 100vw, 1080px'
          />
        </div>
        <div>
          <p>{post.contents}</p>
          <h2>{post.subtitle}</h2>
          <p>{post.contents2}</p>
          {post.subtitle2 !== null && (
          <h2>{post.subtitle2}</h2>
          )}
          {post.contents3 !== null && (
          <p>{post.contents3}</p>
          )}
        </div>
      </div>
      <div>
        <select onChange={(e) => handleChangeShareSocial(e)} className="select">
          <option value="---">Partager sur ...</option>
          <option value="facebook" data-icon="icon-facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">Linkedin</option>
          <option value="email">Email</option>
        </select>
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
