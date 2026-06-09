/* eslint-disable @next/next/no-img-element */

export default function ImageLoader({
  src,
  srcset,
  width,
  alt,
  height,
  priority,
  sizes = '100vw',
}) {
  return (
    <img
      alt={alt}
      src={src}
      height={height}
      width={width}
      srcSet={srcset}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'low'}
      decoding="async"
      sizes={sizes}
    />
  );
}
