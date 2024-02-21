import next from 'next';

export default async function handler(req, res) {
  const nextApp = next(); // `dev: false` pour la production

  await nextApp.prepare();

  // try {
  await nextApp.build();
  res.status(200).send('Build terminée');
  // } catch (error) {
  //   console.error(`Erreur lors de la construction : ${error}`);
  //   res.status(500).send('Erreur lors de la construction');
  // }
  // if (req.method === 'POST') {
  //   const body = await req.json();

  //   if (body.action === 'build') {
  //     // Déclenche la construction du projet

  //     res.end('Build en cours...');
  //   } else {
  //     res.status(400).end('Requête invalide');
  //   }
  // } else {
  //   res.status(405).end('Méthode non autorisée');
  // }
  // try {
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

  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Failed to trigger build and export.' });
  // }
}
