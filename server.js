const express = require('express');
const next = require('next');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://unetaupechezvous.fr');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '3600');
  next();
});