/* eslint-disable @next/next/no-img-element */
function imageLoaderFull({ src, width, quality }) {
  const params = ['c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `${process.env.NEXT_PUBLIC_CLOUD_URL}/${params.join(',')}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`;
}

export default function ImageLoader({
  src,
  width,
  quality,
  alt,
  height,
  priority,
}) {
  const imageSizes = [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  const lastImageSrc = imageLoaderFull({ src, width, quality });

  const srcsetString = imageSizes
    .filter((size) => size <= width)
    .map((size) => `${imageLoaderFull({ src, width: size, quality })} ${size}w`)
    .join(', ');

  const srcsetWithLastImage = `${srcsetString}, ${lastImageSrc} ${width}w`;

  return (
    <img
      alt={alt}
      src={lastImageSrc}
      height={height}
      width={width}
      srcSet={srcsetWithLastImage}
      loading={(priority ? 'eager' : 'lazy')}
      fetchpriority={priority ? 'hight' : 'low'}
      decoding="async"
      sizes={`(max-width: ${width}px) 100vw, ${width}px`}
    />
  );
}
