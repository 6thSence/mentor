const ObjectId = require('mongodb').ObjectID;
const express = require('express');
const path = require('path');

const database = require('./db/database.js');

const app = express();
const port = process.env.PORT || 3000;

app.get('/sendMail', (req, res) =>
    database
        .connect()
        .then((db) =>
            db.collection('Requests')
                .insert({
                    '_id': new ObjectId(req.params.userId),
                    'name': req.query.name,
                    'email': req.query.email
                },
                (err, doc) => {
                    if (err) res.send(err);
                    res.send(doc);
                }))
        .catch(err => res.send(err)));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Listening on port ${port}!`));
