// pages/api/build-export-endpoint.js
export default async function handler(req, res) {
  try {
    console.log(req);
    // eslint-disable-next-line global-require
    const { exec } = require('child_process');
    exec('npm run build');

    res.status(200).json({ message: req.headers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to trigger build and export.' });
  }
}
