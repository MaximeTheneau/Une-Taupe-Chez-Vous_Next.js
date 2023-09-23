export default function middleware(req, apiPath) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(req),
  };
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, requestOptions)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
}
