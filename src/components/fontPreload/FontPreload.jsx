import Head from "next/head";

const FontPreload = () => (
    <>
        <Head>
        <link
            rel="preload"
            href="https://res.cloudinary.com/dsn2zwbis/raw/upload/v1702379223/unetaupechezvous/taupe.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
        />
        <style jsx global>{`
        @font-face {
            font-family: 'fontTitle', sans-serif;
            src: 
            url('https://res.cloudinary.com/dsn2zwbis/raw/upload/v1702379223/unetaupechezvous/taupe.woff2') format('woff2'),
            url('https://res.cloudinary.com/dsn2zwbis/raw/upload/v1702379223/unetaupechezvous/taupe.woff') format('woff'),
            url('https://res.cloudinary.com/dsn2zwbis/raw/upload/v1702379223/unetaupechezvous/taupe.ttf') format('truetype');
            font-display: swap;
            font-style: normal;
            line-height: 5;
            font-weight: 700;
        }
        body {
            font-family: 'fontTitle', sans-serif;
        }
        `}</style>
        </Head>
    </>
);

export default FontPreload;
