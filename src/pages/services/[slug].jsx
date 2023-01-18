import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from '../../styles/Pages.module.scss';

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const res = await fetch('https://back.unetaupechezvous.fr/public/api/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://back.unetaupechezvous.fr/public/api/posts/${params.slug}`);
  const post = await res.json();

  return { props: { post }, revalidate: 1 };
}

export default function Slug({ post }) {
  const descriptionMeta = post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');
  const handleChangeShareSocial = (e) => {
    const social = e.target.value;
    if (social === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    } else if (social === 'email') {
      window.open(`mailto:?subject=${post.title}&body=https://krea-tout-eure.fr/articles/${post.slug}`, '_blank');
    }
  };
  const jsonData = {
    context: 'https://schema.org',
    type: 'service',
    name: post.title,
    description: descriptionMeta,
    image: post.imgPost.path,
    url: `https://unetaupechezvous.fr/${post.slug}`,
    provider: {
      type: 'Organization',
      name: 'Une taupe chez vous',
      id: 'https://unetaupechezvous.fr',
      url: 'https://unetaupechezvous.fr',
    },
    serviceProvider: {
      type: 'Service',
      name: 'Une taupe chez vous',
      id: `https://unetaupechezvous.fr/${post.slug}`,
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
        <meta property="og:site_name" content={`https://unetaupechezvous.fr/services/${post.slug}`} />
        <meta property="og:image" content={post.imgPost.path} />
        <link
          rel="canonical"
          href={`https://unetaupechezvous.fr/services/${post.slug}`}
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
            src={post.imgPost.path}
            alt={post.title}
            width={post.imgPost.width}
            height={post.imgPost.height}
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
          <option value="pinterest">Pinterest</option>
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
