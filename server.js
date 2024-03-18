const http = require('http');
const express = require('express');
const { createHmac } = require('crypto');
const { exec, spawn } = require('child_process');

const app = express();

app.use(express.json());

const port = process.env.PORT;
const authToken = process.env.AUTH_TOKEN;

function verifySignature(signature, body) {
  const hmac = createHmac('sha256', authToken);
  hmac.update(JSON.stringify(body));
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;
  return signature === calculatedSignature;
}

app.post('/api/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const branch = 'main';

  const { body } = req;

  if (!verifySignature(signature, body)) {
    return res.status(401).send('Unauthorized');
  }

  if (req.headers['x-taupe-event'] === 'build') {
    exec('npm run build', (error) => {
      if (error) {
        return res.status(500).send(`Error running npm run build: ${error}`);
      }
      return res.status(200).send('Build event received and executed');
    });
  }

  if (req.headers['x-github-event'] === 'push') {
    const gitStash = spawn('git', ['status', '--porcelain']);

    gitStash.stdout.on('data', (data) => {
      if (data.toString().trim() !== '') {
        const gitStashChanges = spawn('git', ['stash']);

        gitStashChanges.on('close', (code) => {
          if (code === 0) {
            const gitPull = spawn('git', ['pull', 'origin', branch]);

            gitPull.on('close', (close) => {
              if (close === 0) {
                exec('npm run build', (error) => {
                  if (error) {
                    return res.status(500).send(`Error running npm run build: ${error}`);
                  }
                  return res.status(200).send('Push event received and executed');
                });
              }
              return res.status(500).send('Error executing git pull');
            });
          }
          return res.status(500).send('Error stashing changes');
        });
      } else {
        const gitPull = spawn('git', ['pull', 'origin', branch]);

        gitPull.on('close', (close) => {
          if (close === 0) {
            exec('npm run build', (error) => {
              if (error) {
                return res.status(500).send(`Error running npm run build: ${error}`);
              }
              return res.status(200).send('Push event received and executed');
            });
          }
          return res.status(500).send('Error executing git pull');
        });
      }
    });

    gitStash.stderr.on('data', (data) => res.status(500).send(`Error stashing changes: ${data}`));
  }

  return res.status(200).send('Event received');
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
