// pages/api/build-export-endpoint.js
export default async function handler(req, res) {
  try {
    const { exec } = require('child_process');
    exec('npm run build && npm run export');

    res.status(200).json({ message: 'Build and export triggered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to trigger build and export.' });
  }
}
