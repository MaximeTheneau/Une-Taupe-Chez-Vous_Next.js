export default function middlewareSearch(req, apiPath, handleResponse200, handleResponseError) {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}${query}`)
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
  