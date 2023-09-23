export default function AuthMiddleware(apiPath, emailValue) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, {
    method: 'POST',
    body: JSON.stringify({
      email: emailValue,
    }),
  });
}
