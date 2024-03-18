const http = require('http');
const express = require('express');
const { createHmac } = require('crypto');
const { exec, spawn } = require('child_process');

const app = express();

app.use(express.json());

const port = process.env.PORT;
const authToken = process.env.AUTH_TOKEN;

if (!port || !authToken) {
  console.error('Port or auth token not provided.');
  process.exit(1);
}

function verifySignature(signature, body) {
  const hmac = createHmac('sha256', authToken);
  hmac.update(JSON.stringify(body));
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;
  return signature === calculatedSignature;
}

app.post('/api/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const event = req.headers['x-github-event'];
  const branch = 'main';

  const { body } = req;

  if (!verifySignature(signature, body)) {
    return res.status(401).send('Unauthorized');
  }

  if (event === 'build') {
    exec('npm run build', (error) => {
      if (error) {
        return res.status(500).send(`Error running npm run build: ${error}`);
      }
      return res.status(200).send('Build event received and executed');
    });
  } else if (event === 'push') {
    const gitStash = spawn('git', ['stash']);

    gitStash.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gitStash.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    gitStash.on('close', (code) => {
      if (code === 0) {
        const gitPull = spawn('git', ['pull', 'origin', branch]);

        gitPull.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        gitPull.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });

        gitPull.on('close', (close) => {
          if (close === 0) {
            exec('npm run build', (error) => {
              if (error) {
                return res.status(500).send(`Error running npm run build: ${error}`);
              }
              return res.status(200).send('Push event received and executed');
            });
          } else {
            return res.status(500).send('Error executing git pull');
          }
        });
      } else {
        return res.status(500).send('Error stashing changes');
      }
    });
  } else {
    return res.status(200).send('Unknown event type');
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
