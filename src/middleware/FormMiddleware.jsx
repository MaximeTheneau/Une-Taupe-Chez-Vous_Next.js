export default function formMiddleware(req, apiPath, handleResponse200, handleResponseError) {
  const path = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;

  console.log('path', path);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
    credentials: 'include',
  };
  fetch(path, requestOptions)
  .then((response) => {
    if (response.ok) {
      handleResponse200();
    } else if (response.status === 500) {
      handleResponseError('Serveur en panne, veuillez revenir plus tard');
    } else {
      response.json().then((data) => {
        handleResponseError(data.erreur);
      });
    }
    });
}
