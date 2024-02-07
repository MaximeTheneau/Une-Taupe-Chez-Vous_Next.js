export default function ImageMiddleware({ src }) {
  return fetch(`${process.env.NEXT_PUBLIC_CLOUD_URL}/fl_getinfo/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Une erreur est survenue');
    })
    .then((imageData) => imageData)
    .catch((error) => {
      console.log(error.message);
      return null;
    });
}
