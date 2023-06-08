const { RouterClass } = require("./routerClass");

class UserRouter extends RouterClass {
    init() {
        this.get('/', (req, res) => {
            res.sens('hola coder')
        })
    }
}

module.exports = {UserRouter}