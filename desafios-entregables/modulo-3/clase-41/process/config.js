const dotenv = require('dotenv')
const { commander } = require('./commander')
const { mode } = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.dev' : './.env.prod'
})

const port = process.env.PORT
const mongoUrl = process.env.MONGO_URL_LOCAL
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY
const githubClientID = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET
const githubCallbackUrl = process.env.GITHUB_CALLBACK_URL
const adminName = process.env.ADMIN_NAME
const adminPassword = process.env.ADMIN_PASSWORD
const persistence = process.env.PERSISTENCE
const gmailUser = process.env.GMAIL_USER
const gmailPassApp = process.env.GMAIL_PASS_APP
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const myPhoneNumber = process.env.MY_PHONE_NUMBER
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const enviroment = process.env.ENVIROMENT

module.exports = {
    port,
    mongoUrl,
    jwtPrivateKey,
    githubClientID,
    githubClientSecret,
    githubCallbackUrl,
    adminName,
    adminPassword,
    persistence,
    gmailUser,
    gmailPassApp,
    twilioAuthToken,
    twilioAccountSid,
    twilioPhoneNumber,
    myPhoneNumber,
    enviroment
}
