export default function imageLoaderFull({ src, width, quality }) {
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  return `${process.env.NEXT_PUBLIC_CLOUD_URL}/${params.join(',')}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`;
}
