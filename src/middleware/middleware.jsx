import { NextResponse } from 'next/server';

export default function middleware(req, apiPath, handleResponse200, handleResponseError) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(req),
  };
  console.log(req);
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
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

