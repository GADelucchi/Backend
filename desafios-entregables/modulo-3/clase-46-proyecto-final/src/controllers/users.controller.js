// Import
const { logger } = require("../config/logger")
const { userService } = require("../service/index.service")

// Code
class UserController {
    getUsers = async () => await userService.get()

    getUsersPaginated = async (req, res) => {
        try {
            const { page = 1 } = req.query
            const users = await userService.getPaginated(page)
            const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = users
            res.status(200).render(`users`, {
                status: `Success`,
                users: docs,
                hasPrevPage,
                hasNextPage,
                page,
                totalPages,
                prevPage,
                nextPage
            })
        } catch {
            logger.error(error)
        }
    }

    getUserById = async (uid) => await userService.getById(uid)

    createUser = async (newUser) => await userService.create(newUser)

    updateUser = async (uid, userToReplace) => await userService.update(uid, userToReplace)

    deleteUser = async (uid) => await userService.delete(uid)

    findUsers = async (connectionLimit) => await userService.finsUsers(connectionLimit)
}

// Export
module.exports = new UserController()