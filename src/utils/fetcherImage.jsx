const fetcherImage = async (url) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLOUD_URL}/fl_getinfo/unetaupechezvous/${url}.jpg`);
  if (!response.ok) {
    throw new Error('Une erreur est survenue');

  }
  const data = await response.json();
  return data;
};

export default fetcherImage;
