// import { exec } from 'child_process';
import Head from 'next/head';
// import { createHmac } from 'crypto';
// pages/api/hello.api.js

export default function buildExportEndpoint() {
  //   try {
  //     // const authToken = process.env.AUTH_TOKEN;

  //     // const signature = req.headers['x-hub-signature-256'];
  //     // const body = JSON.stringify(req.body);

  //     // const hmac = createHmac('sha256', authToken);
  //     // hmac.update(body);
  //     // const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  //     // if (signature !== calculatedSignature) {
  //     //   res.status(401).json({ message: 'Invalid signature.' });
  //     // }
  //   } catch {
  //     res.status(500).json({ message: 'Failed to trigger build and export.' });
  //   }
  //   return res.status(200).json({
  //     message: 'Commande exécutée avec succès.', output: stdout, error, stderr,
  //   });
  // });

  return (
    <>
      <Head>
        <title>test</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <section>
        <h1>test</h1>
      </section>
    </>
  );
}
