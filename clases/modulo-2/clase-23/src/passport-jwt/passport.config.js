const passport = require('passport')
const jwt = require('passport-jwt')
const objectConfig = require('../utils/jwt')

const JWTStrategy = jwt.Strategy
const ExtractorJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['accessToken']
    }
    return token
}

const initPassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractorJWT.fromExtractors([cookieExtractor]),
        secretOrKey: objectConfig.jwt_secret_key    
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    })
)}

module.exports = {
    initPassport
}