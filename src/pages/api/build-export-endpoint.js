export default async function handler(req, res) {
  console.log(req);
  console.error(res);
  // try {
  //   // eslint-disable-next-line global-require
  //   const { exec } = require('child_process');
  //   exec('npm run build');

  //   res.status(200).json({ message: req.headers });
  // } catch (error) {
  //   res.status(500).json({ message: 'Failed to trigger build and export.' });
  // }
}