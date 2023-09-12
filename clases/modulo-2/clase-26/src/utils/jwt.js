const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).send({
            status: `Error`,
            error: `No autenticado`
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, credential) => {
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

module.exports = {
    generateToken,
    authToken
}