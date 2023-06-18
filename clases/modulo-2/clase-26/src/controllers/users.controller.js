// Import
const { userService } = require("../service")

// Code
class UserController {
    getUsers = async (req, res) => {
        try {
            const { page = 1 } = req.query
            const users = await userService.getUsers(page)
            const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = users
            res.status(200).render(`users`, {
                status: `Succes`,
                users: docs,
                hasPrevPage,
                hasNextPage,
                page,
                totalPages,
                prevPage,
                nextPage
            })
        } catch {
            console.log(error)
        }
    }

    getUserById = async (req, res) => {
        try {
            const { uid } = req.params

            let user = await userService.getUserById(uid)
            res.status(200).send({
                status: `Success`,
                payload: user
            })
        } catch {
            console.log(error)
        }
    }

    createUser = async (req, res) => {
        try {
            const newUser = req.body

            let result = await userService.addUser(newUser)
            res.status(200).send({
                status: `Success`,
                payload: result
            })
        } catch {
            console.log(error)
        }
    }

    updateUser = async (req, res) => {
        try {
            const { uid } = req.params
            const user = req.body

            const userToReplace = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                gender: user.gender
            }

            let result = await userService.updateUser(uid, userToReplace)

            res.status(200).send({
                status: `Success`,
                payload: result
            })
        } catch {
            console.log(error)
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params

            let result = await userService.deleteUser(uid)

            res.status(200).send({
                status: `Success`,
                payload: result
            })
        } catch {
            console.log(error)
        }
    }
}


module.exports = new UserController()