const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { JWT_PRIVATE_KEY } = require('../utils/jwt')

const JWTStrategy = Strategy
const ExtractorJWT = ExtractJwt

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
        secretOrKey: JWT_PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            // console.log(jwt_payload);
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    })
    )
}

module.exports = {
    initPassport
}