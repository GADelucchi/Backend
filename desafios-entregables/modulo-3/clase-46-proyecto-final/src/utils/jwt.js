const jwt = require('jsonwebtoken')
const { jwtPrivateKey } = require('../../process/config')

const generateToken = (user) => {
    const token = jwt.sign({ user }, jwtPrivateKey, { expiresIn: '1d' })
    return token
}
const authToken = (req, res, next) => {
    const authCookie = req.cookies

    if (!authCookie) {
        return res.status(401).send({
            status: `Error`,
            error: `No authtentication cookie detected`
        })
    }

    const token = authCookie.accessToken

    jwt.verify(token, jwtPrivateKey, (error, credential) => {
        if (error) {
            return res.status(403).send({
                status: 'Error',
                error: 'No autorizado',
                located: '/utils/jwt.js'
            })
        }
        req.user = credential.user
        next()
    })
}

const generateTokenRestorePass = (email) => {
    const tokenRestorePass = jwt.sign({ email }, jwtPrivateKey, { expiresIn: '1h' })
    return tokenRestorePass
}

const authTokenRestorePass = (req, res, next) => {
    const { token } = req.params

    if (!token) {
        return res.status(401).send({
            status: `Error`,
            error: `No authtentication cookie detected`
        })
    }
    
    jwt.verify(token, jwtPrivateKey, (error, credential) => {
        if (error) {
            return res.status(403).render('sendMailAgain')
        }
        req.email = credential.email
        next()
    })
}


module.exports = {
    generateToken,
    generateTokenRestorePass,
    authToken,
    authTokenRestorePass
}