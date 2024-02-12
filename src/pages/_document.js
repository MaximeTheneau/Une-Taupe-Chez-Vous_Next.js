import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">

      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID});
              `,
          }}
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dsn2zwbis/raw/upload/unetaupechezvous/taupe.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dsn2zwbis/raw/upload/unetaupechezvous/taupe.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dsn2zwbis/raw/upload/unetaupechezvous/taupe.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dsn2zwbis/raw/upload/unetaupechezvous/principal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>

    </Html>
  );
}
