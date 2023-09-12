// Imports externos –––––––––––––––––––––––––––––––––––––––––
const passport = require(`passport`)
const local = require(`passport-local`)
const GithubStrategy = require(`passport-github2`)
const { createHash, isValidPassword } = require("../utils/bcryptHash")
const UserManagerMongo = require("../dao/mongo/user.mongo")
const { logger } = require("./logger")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const LocalStrategy = local.Strategy
const userManagerMongo = new UserManagerMongo()

const initPassport = () => {
    passport.use(`register`, new LocalStrategy({
        passReqToCallback: true,
        usernameField: `email`
    }, async (req, email, password, done) => {
        const { first_name, last_name, username, date_of_birth, admin } = req.body
        try {
            let userDB = await userManagerMongo.getUserByUsername(username)
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

            let result = await userManagerMongo.addUser(newUSer)
            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userManagerMongo.getUserById(id)
        done(null, user)
    })

    passport.use(`login`, new LocalStrategy({
    }, async (username, password, done) => {
        const userDB = await userManagerMongo.getUserByUsername(username)
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
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userManagerMongo.getUserByEmail(profile._json.email)
            if (!user) {
                logger.info(`El usuario no existe, vamos a crearlo`);
                let newUSer = {
                    username: profile.username,
                    first_name: profile._json.name,
                    last_name: profile._json.last_name || " ",
                    email: profile._json.email,
                    date_of_birth: profile._json.date || " ",
                    password: " ",
                    role: profile._json.site_admin
                }
                let result = await userManagerMongo.addUser(newUSer)
                return done(null, result)
            }
            return done(null, user)
        } catch (error) {
            logger.error(`Error de initPassportGithub: ` + error)
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