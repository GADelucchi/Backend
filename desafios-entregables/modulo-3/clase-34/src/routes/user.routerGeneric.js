const usersController = require("../controllers/users.controller");
const { RouterClass } = require("./routerClass");

class UserRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {
                let users = await usersController.getUsers()

                if (users === null) {
                    throw new Error(error)
                }
                res.sendSuccess(users)
            } catch (error) {
                res.sendServerError(error)
            }
        }
        )

        this.get('/:uid', ['PUBLIC'], async (req, res) => {
            try {
                const { uid } = req.params
                const user = await usersController.getUserById(uid)

                if (user === null) {
                    throw new Error(error)
                }
                res.sendSuccess(user)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.post('/', ['ADMIN'], async (req, res) => {
            try {
                const newUser = req.body
                const user = await usersController.createUser(newUser)
                
                if (user === null) {
                    throw new Error(error)
                }
                res.sendSuccess(user)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.put('/:uid', ['ADMIN'], async (req, res) => {
            try {
                const { uid } = req.params
                const user = req.body

                const userToReplace = {
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    role: user.role
                }
                const result = await usersController.updateUser(uid, userToReplace)

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })

        this.delete('/:uid', ['ADMIN'], async (req, res) => {
            try {
                const { uid } = req.params
                const result = await usersController.deleteUser(uid)

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}


module.exports = UserRouter