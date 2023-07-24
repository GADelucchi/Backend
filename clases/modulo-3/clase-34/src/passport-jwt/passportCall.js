const passport = require('passport')

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error)
            if (!user) return res.status(401).send({
                status: 'Error',
                error: info.messages ? info.messages : info.toString()
            })
            req.user = user.user
            next()
        }) (req, res, next)
    }
}

module.exports = {
    passportCall
}