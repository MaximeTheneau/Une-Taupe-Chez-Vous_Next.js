import { NextResponse } from 'next/server';

export function formMiddleware(event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(event),
  };
  fetch('http://localhost:8000/api/contact', requestOptions)
    .catch((err) => console.log(err));
  return NextResponse.next();
}

export function middleware() {
  return NextResponse.next();
}
