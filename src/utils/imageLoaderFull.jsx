export default function imageLoaderFull({ src, width, quality }) {
    return `${process.env.NEXT_PUBLIC_CLOUD_URL}/w_${width}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`
  }