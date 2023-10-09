import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '../../styles/Pages.module.scss';
import imageLoaderFull from '../../utils/imageLoaderFull';
import fetcher from '../../utils/fetcher';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import Comments from '../../components/comments/Comments';

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

  function extractInfo(description) {
    const info = {
      localisation: '',
      siteWeb: '',
      services: '',
    };

    if (description) {
      const matches = description.match(/Localisation : (.*?)Site web : (.*?)Services : (.*)/s);

      if (matches) {
        info.localisation = `${matches[1].trim()}`;
        const cleanLink = matches[2].trim().replace(/^(https?:\/\/)?(www\.)?/, '');
        info.siteWeb = `<a href="${matches[2].trim()}" target="_blank">${cleanLink}</a>`;
        info.services = `${matches[3].trim()}`;
      }
    }

    return info;
  }

  const postsLinks = post.listPosts.map((postItem) => {
    const descriptionInfo = extractInfo(postItem.description);

    return {
      id: postItem.id,
      title: postItem.title,
      description: descriptionInfo,
    };
  });
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`}
          key="canonical"
        />
      </Head>
      {/* Schema.org */}
      <ArticleJsonLd post={post} urlPost={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`} />
      <section className={styles.page}>
        <div className={styles.page__image}>
          <Image
            src={`${post.slug}.webp`}
            alt={post.altImg || post.title}
            loader={imageLoaderFull}
            quality={90}
            width={1080}
            height={608}
            sizes="(max-width: 640px) 100vw,
            (max-width: 750px) 100vw,
            (max-width: 828px) 100vw,
            (max-width: 1080px) 100vw,
            100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
        </div>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>

          <table className={styles.page__table}>
            <thead>
              <tr>
                <th scope="col">Entreprise</th>
                <th scope="col">Localisation</th>
                <th scope="col">Services</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {postsLinks.map((item) => (
                <tr key={item.id}>
                  <td aria-label="Entreprise">{item.title}</td>
                  <td aria-label="Localisation" dangerouslySetInnerHTML={{ __html: item.description.localisation }} />
                  <td aria-label="Services" dangerouslySetInnerHTML={{ __html: item.description.services }} />
                  <td aria-label="Site web" dangerouslySetInnerHTML={{ __html: item.description.siteWeb }} />
                </tr>
              ))}
            </tbody>
          </table>
          <TableOfContents post={post} />
          {post.paragraphPosts.map((paragraphs) => (
            <>
              <h2 key={paragraphs} id={paragraphs.slug}>{paragraphs.subtitle}</h2>
              <p>{paragraphs.paragraph}</p>
            </>
          ))}

          <h3>Référencez-vous gratuitement en tant que professionnel </h3>
          <p>
            Le référencement gratuit, c&apos;est comme une publicité gratuite en continu pour
            votre entreprise. Vous pouvez apparaître dans les résultats de recherche lorsque
            les clients potentiels cherchent des services dans votre domaine. Et devinez quoi
            ? Vous pouvez le faire sans débourser un centime !
          </p>
          <p>
            Alors, comment ça marche ? Vous pouvez vous inscrire sur des plateformes en ligne
            qui offrent des profils professionnels gratuits. Remplissez votre profil avec soin,
            en utilisant des mots clés pertinents pour votre domaine. Parlez de votre localisation,
            de vos services, et site web.
          </p>
          <p>
            Alors, n&apos;attendez plus ! Profitez de cette opportunité pour vous référencer
            gratuitement en tant que professionnel. C&apos;est comme si vous attrapiez le
            Saint-Graal des clients potentiels sans dépenser un centime. Que vous soyez un
            piégeur agréé ou un expert dans la luttes contre les nuisibles, le référencement gratuit
            est votre allié pour briller en ligne.
            Allez-y, faites de votre présence en ligne un succès retentissant !

          </p>
          <Link href="/Annuaire/Inscription-annuaire-gratuite" className="stronk">
            Inscrivez vôtre entreprise gratuitement
          </Link>
        </section>
        <Comments posts={post} />

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
