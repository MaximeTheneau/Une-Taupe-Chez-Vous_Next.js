const express = require('express');
const app = express();
app.use(express.json()) // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})) // to support URL-encoded bodies

app.post('/api/form', (req, res) => {
    // Code pour gérer la soumission du formulaire ici
    // req.body contient les données du formulaire
    res.send('Formulaire soumis avec succès !')
})