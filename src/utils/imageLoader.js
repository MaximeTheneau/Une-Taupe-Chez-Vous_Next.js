export default function myImageLoader({ src, width, quality }) {
    return `https://unetaupechezvous/${src}?w=${width}&q=${quality || 75}`
  }