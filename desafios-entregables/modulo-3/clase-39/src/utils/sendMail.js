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

exports.sendMail = async (email, subject, html) => {
    return await transport.sendMail({
        from: 'Server <gdelucchi97@gmail.com>',
        to: email,
        subject: subject,
        html: html
    })
}