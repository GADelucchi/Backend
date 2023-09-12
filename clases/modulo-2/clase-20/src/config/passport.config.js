// Imports externos –––––––––––––––––––––––––––––––––––––––––
const passport = require(`passport`)
const local = require(`passport-local`)
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptHash")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const LocalStrategy = local.Strategy

const initPassport = () => {
    passport.use(`register`, new LocalStrategy({
        passReqToCallback: true,
        usernameField: `email`
    }, async (req, email, password, done) => {
        const { first_name, last_name, username, date_of_birth } = req.body
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
                password: createHash(password)
            }

            let result = await userModel.create(newUSer)

            return done(null, result)
        } catch (error) {
            return done(`Error al obtener el usuario` + error)
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

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    initPassport
}