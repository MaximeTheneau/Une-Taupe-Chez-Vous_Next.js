export default function middleware(req, apiPath) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(req),
  };
  fetch(`http://localhost:8000/api/${apiPath}`, requestOptions)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
}
