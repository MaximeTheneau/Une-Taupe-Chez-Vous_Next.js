const http = require('http');

const port = process.env.PORT;
const authToken = process.env.AUTH_TOKEN;

const express = require('express');
const { createHmac } = require('crypto');
const { exec, spawn } = require('child_process');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://taupe.vercel.app',
};
app.use(cors(corsOptions));

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

  if (!verifySignature(signature, body)) {
    console.error('Invalid signature.');
    return res.status(401).send('Invalid signature');
  }

  const bodyString = JSON.stringify(body);

  const hmac = createHmac('sha256', authToken);
  hmac.update(bodyString);
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  if (signature !== calculatedSignature) {
    console.error('Invalid signature.');
    res.status(401).send('Invalid signature');
  }

  if (req.headers['x-taupe-event'] === 'build') {
    console.log('Received build event');
    exec('npm run build', (error, stdout) => {
      if (error) {
        console.error(`Error running npm run build: ${error}`);
        return;
      }
      console.log(`npm run build output: ${stdout}`);
    });
    res.status(200).send('Build event received');
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

    res.status(200).send('Push event received');
  }

  res.status(200).send('Webhook error');
});
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
