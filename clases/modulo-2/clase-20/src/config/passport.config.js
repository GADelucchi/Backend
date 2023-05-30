// Imports externos –––––––––––––––––––––––––––––––––––––––––
const passport = require(`passport`)
const local = require(`passport-local`)
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, isValidPassword } = require("../utils/bcryptHash")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const LocalStrategy = local.Strategy

const initPassport = () => {
    passport.use(`register`, new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        const { first_name, last_name } = req.body
        try {
            
        } catch (error) {
            return done(`Error al obtener el usuario`+error)
        }
    }))
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    initPassport
}