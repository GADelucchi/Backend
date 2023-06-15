const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { jwtPrivateKey } = require('../../process/config')



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
        secretOrKey: jwtPrivateKey
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