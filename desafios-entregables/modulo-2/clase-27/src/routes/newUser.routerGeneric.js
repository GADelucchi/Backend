const { RouterClass } = require("./routerClass");

class UserRouter extends RouterClass {
    init() {
        this.get('/', (req, res) => {
            try {
                res.sendSuccess('Hola Coder!')
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }

    init() {
        this.get('/current', ['PUBLIC'], (req, res) => {
            try {
                res.sendSuccess('Validado PUBLIC')
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = UserRouter