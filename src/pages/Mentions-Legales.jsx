import Head from 'next/head';
import Image from 'next/image';
import imageLoaderFull from '../utils/imageLoaderFull';
import Button from '../components/button/button';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);

  return {
    props: {
      page,
    },
  };
}

export default function MentionsLegal({ page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <>
        <Head>
          <title>{page.title}</title>
          <meta name="description" content={page.metaDescription} />
          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={page.title} />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
          <meta property="og:description" content={page.metaDescription} />
          <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.imgPost}.jpg`} />
          <link
            rel="canonical"
            href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
            key="canonical"
          />
        </Head>
        <section>
          <figure>
            <Image
              src={`${page.imgPost}.webp`}
              alt={page.altImg || page.title}
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
            {page.title !== page.altImg && (
            <figcaption className="caption">
              {page.altImg}
            </figcaption>
            )}
          </figure>
          <h1>{page.title}</h1>
          <h2>{page.subtitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.contentsHTML }} />
          <Button />
        </section>
      </>
    </>
  );
}
