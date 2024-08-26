const http = require('http');
const express = require('express');
const { createHmac } = require('crypto');
const { exec, spawn } = require('child_process');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const authToken = process.env.AUTH_TOKEN;

function verifySignature(signature, body) {
  const hmac = createHmac('sha256', authToken);
  hmac.update(JSON.stringify(body));
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;
  return signature === calculatedSignature;
}

app.post('/api/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const githubEvent = req.headers['x-github-event'];
  const branch = 'main';
  if (!signature || !authToken) {
    return res.status(400).send('Missing signature or authentication token');
  }

  if (!verifySignature(signature, req.body)) {
    return res.status(401).send('Invalid signature');
  }

  if (githubEvent === 'Build') {
    exec('pnpm run build', (error) => {
      if (error) {
        return res.status(500).send(`Error running pnpm run build: ${error.message}`);
      }
      return res.status(200).send('Build event received and executed');
    });
  } else if (githubEvent === 'push') {
    const gitStash = spawn('git', ['stash']);

    gitStash.on('error', (error) => {
      console.error(`Error stashing changes: ${error.message}`);
      return res.status(500).send(`Error stashing changes: ${error.message}`);
    });

    gitStash.on('exit', (code) => {
      if (code !== 0) {
        return res.status(500).send('Failed to stash changes');
      }

      const gitPull = spawn('git', ['pull', 'origin', branch]);

      gitPull.on('error', (error) => {
        console.error(`Error pulling changes: ${error.message}`);
        return res.status(500).send(`Error pulling changes: ${error.message}`);
      });

      gitPull.on('exit', (code) => {
        if (code !== 0) {
          return res.status(500).send('Failed to pull changes');
        }

        exec('pnpm run build', (error) => {
          if (error) {
            return res.status(500).send(`Error running pnpm run build: ${error.message}`);
          }
          return res.status(200).send('Push event received and executed');
        });
      });
    });
  } else {
    return res.status(400).send('Unsupported event type');
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
