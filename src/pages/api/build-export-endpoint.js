import { exec } from 'child_process';
// import { createHmac } from 'crypto';
// pages/api/hello.api.js

export default function handler(
  req,
  res,
) {
  exec('npm run build', (error, stdout, stderr) => {
    // if (error) {
    //   console.error(`exec error: ${error}`);
    //   return res.status(200).json({
    //     message: 'Failed to trigger build and export.', error, stderr, stdout,
    //   });
    // }
    // console.log('stdout: ');

    try {
      // const authToken = process.env.AUTH_TOKEN;

      // const signature = req.headers['x-hub-signature-256'];
      // const body = JSON.stringify(req.body);

      // const hmac = createHmac('sha256', authToken);
      // hmac.update(body);
      // const calculatedSignature = `sha256=${hmac.digest('hex')}`;

      // if (signature !== calculatedSignature) {
      //   res.status(401).json({ message: 'Invalid signature.' });
      // }
    } catch {
      res.status(500).json({ message: 'Failed to trigger build and export.' });
    }
    return res.status(200).json({
      message: 'Commande exécutée avec succès.', output: stdout, error, stderr,
    });
  });
}
