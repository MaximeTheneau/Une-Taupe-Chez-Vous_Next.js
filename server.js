const express = require('express');
const next = require('next');

const secure = require('express-force-https');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // redirect to SSL
    if (!dev) {
      server.use(secure);
    }

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });


app.get('/api/build-export-endpoint', async (req, res) => {
  try {
    const { exec } = require('child_process');
    exec('npm run build');
    res.status(200).json({ message: 'Yep' });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to trigger build and export.' });
  }
});
