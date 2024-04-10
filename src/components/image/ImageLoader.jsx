/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';

function imageLoaderFull({ src, width, quality }) {
  const params = ['c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `${process.env.NEXT_PUBLIC_CLOUD_URL}/${params.join(',')}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`;
}

export default function ImageLoader({
  src,
  width,
  quality,
  // alt,
  // height,
  // priority,
}) {
  const [loaded, setLoaded] = useState(false);

  const imageSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  // Construire l'URL de la dernière image
  const lastImageSrc = imageLoaderFull({ src, width, quality });

  // Construire srcset pour toutes les tailles d'images
  const srcsetString = imageSizes
    .filter((size) => size <= width)
    .map((size) => `${imageLoaderFull({ src, width: size, quality })} ${size}w`)
    .join(', ');

  // Ajouter la dernière image à srcset
  const srcsetWithLastImage = `${srcsetString}, ${lastImageSrc} ${width}w`;

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.imageSrcset = srcsetWithLastImage;
    link.imageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    document.head.appendChild(link);

    const img = new Image();
    img.src = lastImageSrc;
    img.onload = () => {
      setLoaded(true);
    };
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <>
      {!loaded && <div className="loader">Loading...</div>}
      <img
        alt="alt"
        src={lastImageSrc}
        // height={height}
        // width={width}
        // loading={priority ? 'eager' : 'lazy'}
        // fetchpriority="high"
        // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1024px"
      />
    </>
  );
}
