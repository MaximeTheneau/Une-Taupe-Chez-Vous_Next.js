const http = require('http');

const port = process.env.PORT;
const authToken = process.env.AUTH_TOKEN;

const express = require('express');
const { createHmac } = require('crypto');
// const { exec, spawn } = require('child_process');
const { exec, spawn } = require('child_process');

const app = express();

app.use(express.json());

app.post('/api/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const { body } = req;

  // Vérifier que req.body est défini et qu'il s'agit d'un objet JSON
  if (!body || typeof body !== 'object') {
    console.error('Request body is missing or not in JSON format.');
    return res.status(400).send('Bad request');
  }

  const bodyString = JSON.stringify(body);

  const hmac = createHmac('sha256', authToken);
  hmac.update(bodyString);
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  if (signature !== calculatedSignature) {
    console.error('Invalid signature.');
    res.status(401).send('Invalid signature');
  }

  if (req.headers[`x-${process.env.NEXT_PUBLIC_DOMAIN}-event`] === 'build') {
    console.log('Received build event');
    // eslint-disable-next-line global-require
    exec('npm run build', (error, stdout) => {
      if (error) {
        console.error(`Error running npm run build: ${error}`);
        return;
      }
      console.log(`npm run build output: ${stdout}`);
    });
  }
  if (req.headers['x-github-event'] === 'push') {
    const branch = 'main';
    const gitStash = spawn('git', ['stash']);

    gitStash.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    const gitPull = spawn('git', ['pull', 'origin', branch]);

    gitPull.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gitPull.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    gitPull.on('close', (code) => {
      if (code === 0) {
        console.log('Git pull successful :).');
        res.status(200).send('Git pull successful :).');
        exec('npm run build', (error, stdout) => {
          if (error) {
            console.error(`Error running npm run build: ${error}`);
            return;
          }
          console.log(`npm run build output: ${stdout}`);
        });
      }
    });
  }

  res.status(200).send('Webhook received');
});
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
