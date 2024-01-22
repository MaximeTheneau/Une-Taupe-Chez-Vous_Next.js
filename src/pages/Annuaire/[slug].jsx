import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import imageLoaderFull from '../../utils/imageLoaderFull';
import fetcher from '../../utils/fetcher';
import TableOfContents from '../../components/tableOfContents/TableOfContents';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import Comments from '../../components/comments/Comments';
import fetcherImage from '../../utils/fetcherImage';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Annuaire`);
  const posts = await res.json();

  const filteredPosts = posts.filter((post) => post.slug !== 'Inscription-annuaire-gratuite');

  const paths = filteredPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const image = await fetcherImage(post.imgPost);

  return { props: { post, image: image.input } };
}

export default function Slug({ post, image }) {
  const urlPost = `${process.env.NEXT_PUBLIC_URL}/${post.category.slug}/${post.slug}`;

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
        <title>{post.heading}</title>
        <meta name="description" content={post.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:site_name" content={urlPost} />
        <meta property="og:url" content={urlPost} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="720" />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:section" content={post.category.name} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.metaDescription} />
        <meta property="twitter:site" content="@UneTaupe_" />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={post.altImg || post.title} />
        <meta property="twitter:domain" content={urlPost} />
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
      <section>
        <h1>{post.title}</h1>
        <p className={styles.page__contents__date}>
          {post.formattedDate}
        </p>
        <figure>
          <Image
            src={`${post.imgPost}.webp`}
            alt={post.altImg || post.title}
            quality={75}
            width={image.width}
            height={image.height}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
          {post.title !== post.altImg && (
          <figcaption className="caption">
            {post.altImg}
          </figcaption>
          )}
        </figure>
        <div dangerouslySetInnerHTML={{ __html: post.contentsHTML }} />
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
            {postsLinks.map((item) => item.description.localisation && (
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
            <div dangerouslySetInnerHTML={{ __html: paragraphs.paragraph }} />
            {paragraphs.linkSubtitle && (
              <div className={styles.page__contents__paragraph__links}>
                <span className={styles.page__contents__paragraph__links__link}>
                  → A lire aussi :
                  <Link href={paragraphs.link}>
                    {' '}
                    {paragraphs.linkSubtitle}
                  </Link>
                </span>
              </div>
            )}
          </>
        ))}

        <h3>Référencez-vous gratuitement en tant que professionnel </h3>
        <p>
          Le référencement gratuit, c&apos;est comme une publicité gratuite en continu pour
          votre entreprise. Vous pouvez apparaître dans les résultats de recherche lorsque
          les clients potentiels cherchent des services dans votre domaine. Et devinez quoi
          ? Vous pouvez le faire sans débourser un centime !
        </p>
        <Link href="/Annuaire/Inscription-annuaire-gratuite" className="stronk">
          Inscrivez vôtre entreprise gratuitement
        </Link>
      </section>
      <Comments posts={post} />

    </>
  );
}
