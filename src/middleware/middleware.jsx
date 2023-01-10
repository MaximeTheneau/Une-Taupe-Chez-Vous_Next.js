import { NextResponse } from 'next/server';

export function formMiddleware(event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(event),
  };
  fetch('http://localhost:8000/api/form', requestOptions)
    .catch((err) => console.log(err));
  return NextResponse.next();
}

export function middleware() {
  return NextResponse.next();
}
