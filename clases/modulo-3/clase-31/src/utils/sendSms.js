const twilio = require('twilio')
const { twilioAuthToken, twilioAccountSid, myPhoneNumber, twilioPhoneNumber } = require('../../process/config')

const client = twilio(twilioAccountSid, twilioAuthToken)

exports.sendSms = () => client.messages.create({
    body: 'SMS de prueba',
    from: twilioPhoneNumber,
    to: myPhoneNumber
})