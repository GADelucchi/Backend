const nodemailer = require('nodemailer')

const { gmailUser, gmailPassApp } = require('../../process/config.js')


const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: gmailUser,
        pass: gmailPassApp
    }
})

exports.sendMail = async (to, subject, html) => {
    return await transport.sendMail({
        from: 'Gastón ,gdelucchi97@gmail.com>',
        to: to,
        subject: subject,
        html: html,
        attachments: [{
            filename: 'nodejs.png',
            path: __dirname + '/nodejs.png',
            cid: 'nodejs'
        }]
    })
}