// Imports externos –––––––––––––––––––––––––––––––––––––––––
const passport = require(`passport`)
const local = require(`passport-local`)
const GithubStrategy = require(`passport-github2`)
require(`dotenv`).config()
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptHash")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const LocalStrategy = local.Strategy

const initPassport = () => {
    passport.use(`register`, new LocalStrategy({
        passReqToCallback: true,
        usernameField: `email`
    }, async (req, email, password, done) => {
        const { first_name, last_name, username, date_of_birth, admin } = req.body
        try {
            let userDB = await userModel.findOne({ email: username })
            if (userDB) {
                return done(null, false)
            }

            let newUSer = {
                username,
                first_name,
                last_name,
                email,
                date_of_birth,
                password: createHash(password),
                role: admin
            }

            let result = await userModel.create(newUSer)
            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findOne({ _id: id })
        done(null, user)
    })

    passport.use(`login`, new LocalStrategy({
    }, async (username, password, done) => {
        const userDB = await userModel.findOne({ username })
        try {
            if (!userDB) {
                return done(null, false)
            }
            if (!isValidPassword(password, userDB)) {
                return done(null, false)
            }
            return done(null, userDB)
        } catch (error) {
            return done(error)
        }
    }))
}

const initPassportGithub = () => {
    passport.use(`github`, new GithubStrategy({
        clientID: `Iv1.2bc85fd328775ad4`,
        clientSecret: `fefa901c502241d3fb803762513624b8bf34aff5`,
        callbackURL: `http://localhost:8080/api/session/githubcallback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                console.log(`El usuario no existe, vamos a crearlo`);
                let newUSer = {
                    username: profile.username,
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    date_of_birth: profile.username,
                    passeword: ``,
                }
                let result = await userModel.create(newUSer)
                return done(null, result)
            }
            return done(null, user)
        } catch (error) {
            console.log(`Error de initPassportGithub: ` + error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findOne({ _id: id })
        done(null, user)
    })

}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    initPassport,
    initPassportGithub
}