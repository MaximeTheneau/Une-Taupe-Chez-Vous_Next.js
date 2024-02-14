export default function formMiddleware(req, apiPath, handleResponse200, handleResponseError) {
  const formData = new FormData();
  Object.keys(req).forEach((key) => {
    if (key === 'image') {
      formData.append('image', req.image); // Ajoutez l'image au FormData
    } else {
      formData.append(key, req[key]);
    }
  });

  const requestOptions = {
    method: 'POST',
    body: formData,
  };
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        handleResponse200();
      } else {
        response.json().then((data) => {
          console.log(data);
          handleResponseError(data.erreur);
        });
      }
    });
}
