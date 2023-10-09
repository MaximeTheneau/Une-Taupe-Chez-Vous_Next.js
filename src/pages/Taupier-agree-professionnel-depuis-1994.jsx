import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import styles from '../styles/Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import GoogleMaps from '../components/maps/GoogleMaps';
import Button from '../components/button/button';
import NotCopie from '../components/notCopie/NotCopie';
import fetcher from '../utils/fetcher';

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Taupier-agree-professionnel-depuis-1994`);

  return {
    props: {
      responsePage,
    },
  };
}

export default function TaupierPage({ responsePage }) {
  const { data: pageSwr } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}posts/Taupier-agree-professionnel-depuis-1994`, fetcher);

  const page = pageSwr || responsePage;

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
            {page.title !== page.altImg  && (
              <figcaption className='caption'>
                {page.altImg}
              </figcaption>
            )}
          </figure>
            <h1>{page.title}</h1>
          <div itemScope itemType="https://schema.org/PostalAdress">
            <p itemProp="name"> 
              <strong>Entreprise : </strong>
              <span itemProp="name">Une Taupe Chez Vous</span>
            </p>
            <p itemProp="address">
              <strong>Adresse : </strong>
              <span itemProp="streetAddress">71 Marie Curie </span>
              <span itemProp="postalCode">27780 </span>
              <span itemProp="addressLocality">Garrennes-Sur-Eure</span>
            </p>
            <p itemProp="telephone">
              <strong>Téléphone : </strong>
              <Link href="tel:+33232264958"> +33 2 32 26 49 58</Link>
            </p>
            <NotCopie />
            <p>
              <strong>Numéro SIRET :</strong>
              {' '}
              39338032400029
            </p>
          </div>
        < >
          {page.paragraphPosts.map((paragraphPosts) => (
            <div
              className={styles.page__contents__paragraph}
              key={paragraphPosts.subtitle}
            >
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
              <h2>{paragraphPosts.subtitle}</h2>
              <div dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
            </div>
          ))}
         
          <Button />
          <GoogleMaps />

        </>
      </section>
    </>
  );
}
