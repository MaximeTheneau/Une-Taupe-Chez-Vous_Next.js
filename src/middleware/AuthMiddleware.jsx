export default function AuthMiddleware(apiPath) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Échec de la requête');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Données de la réponse:', data);
    })
    .catch((error) => {
      console.error('Erreur:', error);
      throw error;
    });
}
