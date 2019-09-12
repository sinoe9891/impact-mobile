const express = require('express');
const fs = require('fs');
var nodemailer = require('nodemailer');
const Email = require('email-templates');

/** Router */
const router = express.Router();

const correo_base = 'giancarlo.torres@impactmobilehn.com';

/** SMTP Server */
var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: correo_base,
	pass: 'Tozava87'
        
    }
});



const email = new Email({
    message: {
        from: 'Info Impact Mobile <' + correo_base + '>',
	replyTo: correo_base
    },
    transport: {
        jsonTransport: true
    }
});

router.get('/sendEmail', (req, res, next) => {
    const { to, subject, html } = req.query;

    console.log(req.query);
    if (to && subject && html) {


        const mailOptions = {
        from: 'Info Impact Mobile <' + correo_base + '>',
	replyTo: correo_base,
        bcc: correo_base,
            to: Array.isArray(to) ? to[0] : to,
            subject: Array.isArray(subject) ? subject[0] : subject,
            html: Array.isArray(html) ? html[0] : html
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).send(info);
        });
    } else {
        res.status(500).send({
            message: 'Missing field.'
        });
    }
});

module.exports = router;

