const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword',
  },
});

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/api/form', (req, res) => {
  const mailOptions = {
    from: req.body.email,
    to: 'youremail@gmail.com', // email destinataire
    subject: 'Soumission de formulaire de contact',
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send('Formulaire soumis avec succès !');
    }
  });
  res.send('Formulaire soumis avec succès !');
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
