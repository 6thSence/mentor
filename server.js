const express = require('express');
const path = require('path');

const sendMail = require('./sendMail');

const app = express();
const port = process.env.PORT || 3000;

app.get('/sendMail', (req, res) => sendMail(req, res));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Listening on port ${port}!`));
