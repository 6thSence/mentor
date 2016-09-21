const nodemailer = require('nodemailer');

const pass = process.env.EMAILPASS;

const transporter = nodemailer.createTransport(`smtps://d.pushkarskaya.pr%40gmail.com:${pass}@smtp.gmail.com`);

module.exports = (req, res) => {
    const mailOptions = {
        from: '"Пушкарская Дарья" <d.pushkarskaya.pr@gmail.com>',
        to: 'd.pushkarskaya.pr@gmail.com',
        subject: 'Регистрация на менторство ✔',
        html: `<h1>Имя: ${req.query.name}</h1><h2>Email: ${req.query.email}</h2> `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send(false);
        }
        console.log('Message sent: ' + info.response);
        res.send(true);
    });
};
