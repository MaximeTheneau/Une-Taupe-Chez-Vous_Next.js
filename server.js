const express = require('express');
const next = require('next');


// app.get('/api/build-export-endpoint', async (req, res) => {
//   try {
//     const { exec } = require('child_process');
//     exec('npm run build');
//     res.status(200).json({ message: 'Yep' });  
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to trigger build and export.' });
//   }
// });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://unetaupechezvous.fr');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '3600');
  next();
});