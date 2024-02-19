import { createHmac } from 'crypto';

const { exec } = require('child_process');
/* eslint-disable no-console */

export default async function handler(req, res) {
  const authToken = process.env.AUTH_TOKEN;
  const signature = req.headers['x-hub-signature-256'];
  const body = JSON.stringify(req.body);

  const hmac = createHmac('sha256', authToken);
  hmac.update(body);
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  if (signature !== calculatedSignature) {
    res.status(401).send('Unauthorized request!');

    return;
  }
  exec('npm run build', (error, stdout) => {
    if (error) {
      console.error(`Error running npm run build: ${error}`);
      return;
    }
    console.log(`npm run build output: ${stdout}`);
  });
}
