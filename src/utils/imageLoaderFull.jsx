export default function imageLoaderFull({ src, width, quality }) {
  console.log('w', src, width, quality);
  return `${process.env.NEXT_PUBLIC_CLOUD_URL}/w_${width},q_${quality}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`;
}
