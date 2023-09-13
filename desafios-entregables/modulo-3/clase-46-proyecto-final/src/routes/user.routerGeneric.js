const { logger } = require("../config/logger");
const cartsController = require("../controllers/carts.controller");
const usersController = require("../controllers/users.controller");
const { UserDto } = require("../dto/user.dto");
const { uploaderDocument } = require("../utils/multer");
const { sendMail } = require("../utils/sendMail");
const { RouterClass } = require("./routerClass");

class UserRouter extends RouterClass {
    init() {
        this.get('/', ['ADMIN'], async (req, res) => {
            try {
                let users = await usersController.getUsers()

                if (users === null) {
                    throw new Error(error)
                }

                const userDtos = users.map(user => new UserDto(user));

                res.send({
                    users: userDtos
                })
            } catch (error) {
                logger.error(error)
            }
        })

        this.get('/:uid', ['PUBLIC'], async (req, res) => {
            try {
                const { uid } = req.params
                const user = await usersController.getUserById(uid)

                if (user === null) {
                    throw new Error(error)
                }
                res.sendSuccess(user)
            } catch (error) {
                logger.error(error)
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
                logger.error(error)
            }
        })

        this.post('/:uid/documents', ['PUBLIC'], uploaderDocument.single(`myFile`), async (req, res) => {
            try {
                const { uid } = req.params

                res.status(200).send({
                    status: 'Success',
                    message: 'Document successfully uploaded'
                })
            } catch (error) {
                logger.error(error)
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
                logger.error(error)
            }
        })

        this.put('/premium/:uid', ['ADMIN'], async (req, res) => {
            try {
                const { uid } = req.params
                const userSearched = await usersController.getUserById(uid)

                if (!userSearched.identification ||
                    !userSearched.proofOfAddress ||
                    !userSearched.statementOfAccount ||
                    userSearched.identification === 'off' ||
                    userSearched.proofOfAddress === 'off' ||
                    userSearched.statementOfAccount === 'off') {
                    return res.status(400).send({
                        status: 'Error',
                        error: 'Require more documents to be premium'
                    })
                }

                if (userSearched.role === 'premium') {
                    userSearched.role = 'user'
                    const result = await usersController.updateUser(uid, userSearched)
                    return res.sendSuccess(result)
                } else if (userSearched.role === 'user') {
                    userSearched.role = 'premium'
                    const result = await usersController.updateUser(uid, userSearched)
                    return res.sendSuccess(result)
                }
            } catch (error) {
                logger.error(error)
            }
        })

        this.delete('/', ['ADMIN'], async (req, res) => {
            try {
                const connectionLimit = new Date();
                connectionLimit.setMinutes(connectionLimit.getMinutes() - 2)
                console.log(connectionLimit)

                const result = await usersController.findUsers(connectionLimit)

                for (const user of result) {
                    const uid = user._id
                    const cid = user.cart

                    const deletedCart = await cartsController.deleteCart(cid)
                    const deletedUser = await usersController.deleteUser(uid)
                    sendMail(user.email, 'Cuenta eliminada', `<h1>Se eliminó tu cuenta por inactividad</h1>`)
                }

                res.send({
                    status: 'Success',
                    message: 'Usuarios y carritos eliminados',
                })
            } catch (error) {
                logger.error(error)
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
                logger.error(error)
            }
        })
    }
}


module.exports = UserRouter