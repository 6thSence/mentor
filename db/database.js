const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://mentor:pushgroupnsk17@ds061196.mlab.com:61196/heroku_nw5dtv6g';

module.exports.connect = () =>
    new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                console.log('problems with db connetion');
                return reject(err);
            }
            console.log('db conneted');
            return resolve(db);
        });
    });