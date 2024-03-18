const http = require('http');

const port = process.env.PORT;
const authToken = process.env.AUTH_TOKEN;

const express = require('express');
const { createHmac } = require('crypto');
const { exec, spawn } = require('child_process');

const app = express();

app.use(express.json());

function verifySignature(signature, body) {
  const hmac = createHmac('sha256', authToken);
  hmac.update(JSON.stringify(body));
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;
  return signature === calculatedSignature;
}

app.post('/api/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const { body } = req;
  // if (!verifySignature(signature, body)) {
  //   return res.status(401).send('Unauthorized');
  // }

  if (req.headers['x-taupe-event'] === 'build') {
    exec('npm run build', (error) => {
      if (error) {
        return res.status(500).send(`Error running npm run build: ${error}`);
      }
      return res.status(200).send('Build for back event received');
    });
  }
  if (req.headers['x-github-event'] === 'push') {
    const branch = 'main';
    const gitStash = spawn('git', ['stash']);

    gitStash.stdout.on();

    const gitPull = spawn('git', ['pull', 'origin', branch]);

    gitPull.stdout.on();

    gitPull.on('close', (code) => {
      if (code === 0) {
        res.status(200).send('Git pull successful :).');
        exec('npm run build', (error) => {
          if (error) {
            return res.status(500).send(`Error running npm run build: ${error}`);
          }
          return res.status(200).send('Push and build Github event received');
        });
      }
    });
  }
  res.status(200).send('Webhook error');
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
