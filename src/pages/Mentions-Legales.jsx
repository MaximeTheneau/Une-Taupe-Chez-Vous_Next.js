import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import styles from '../styles/Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import Button from '../components/button/button';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);

  return {
    props: {
      responsePage,
    },
  };
}

export default function MentionsLegal({ responsePage }) {
  const { data: pageSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`, fetcher);

  const page = pageSwr || responsePage;

  const descriptionMeta = page.contents.replace(/(<([^>]+)>)/gi, '').substring(0, 160);
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <>
        <section className={styles.page__image}>
          <h1>Mention Legales</h1>
          <Image
            src={`${page.slug}.webp`}
            alt={page.altImg || page.title}
            width="1080"
            height="720"
            quality={100}
            loader={imageLoaderFull}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </section>
        <section>
          <h2>{page.subtitle}</h2>
          <p>
            {page.contents}
          </p>
          <Button />
        </section>
      </>
    </>
  );
}
