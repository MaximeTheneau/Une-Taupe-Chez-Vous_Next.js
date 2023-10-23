export default function middleware(req, apiPath, handleResponse200, handleResponseError) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://back.unetaupechezvous.fr' },
    credentials: 'include',
    body: JSON.stringify(req),
  };
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return handleResponse200();
      }
      throw new Error('Une erreur est survenue');
    });
}
