// import { createHmac } from 'crypto';

/* eslint-disable no-console */

export default async function handler(req, res) {
  // const authToken = process.env.AUTH_TOKEN;
  // const signature = req.headers['x-hub-signature-256'];
  // const body = JSON.stringify(req.body);

  // const hmac = createHmac('sha256', authToken);
  // hmac.update(body);
  // const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  try {
    // const authToken = process.env.AUTH_TOKEN;
    // const signature = req.headers['x-hub-signature-256'];
    // const body = JSON.stringify(req.headers);

    // const hmac = createHmac('sha256', authToken);
    // hmac.update(body);
    // const calculatedSignature = `sha256=${hmac.digest('hex')}`;

    // if (signature !== calculatedSignature) {
    //   res.status(401).send(`Invalid signature.${signature} ${calculatedSignature}`);
    //   res.send(signature);
    // }
    // eslint-disable-next-line global-require
    const { exec } = require('child_process');
    exec('npm run build');

    res.status(200).json({ message: req.headers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to trigger build and export.' });
  }
}
