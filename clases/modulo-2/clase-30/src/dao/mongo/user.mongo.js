// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { userModel } = require(`./models/user.model`)

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class UserDaoMongo {
    constructor() {
        this.users = userModel
    }

    getUsers = async (page) => await this.users.paginate({}, { limit: 10, page: page, lean: true })

    getUserById = async (uid) => await this.users.findOne({ _id: uid })

    getUserByEmail = async (email) => await this.users.findOne({ email })

    getUserByUsername = async (username) => await this.users.findOne({ username })

    addUser = async (newUser) => await this.users.create(newUser)

    updateUser = async (uid, updatedUser) => await this.users.updateOne({ _id: uid }, updatedUser)

    deleteUser = async (uid) => await this.users.deleteOne({ _id: uid })
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = UserDaoMongo