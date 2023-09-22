export default function AuthMiddleware(apiPath, emailValue) {
  return fetch(`http://localhost:8000/api/${apiPath}`, {
    method: 'POST',
    body: JSON.stringify({
      email: emailValue,
    }),
  });
}
