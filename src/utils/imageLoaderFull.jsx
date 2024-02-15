export default function imageLoaderFull({ src, width, quality }) {
  const params = [`w_${width}`, `q_${quality || '75'}`];
  return `${process.env.NEXT_PUBLIC_CLOUD_URL}/${params.join(',')}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`;
}
