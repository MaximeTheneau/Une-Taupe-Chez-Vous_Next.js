export const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Une erreur est survenue');
    }
    const data = await response.json();
    return data;
  };