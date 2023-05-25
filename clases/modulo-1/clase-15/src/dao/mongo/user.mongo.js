// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { userModel } = require(`./models/user.model`)

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class UserManagerMongo {
    async getUsers() {
        try {
            return await userModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }

    async getUserById(uid) {
        try {
            return await userModel.findOne({_id: uid})
        } catch (error) {
            return new Error(error)
        }
    }

    async addUser(newUser) {
        try {
            return await userModel.create(newUser)
        } catch (error) {
            return new Error(error)
        }
    }

    async updateUser(uid, updatedUser) {
        try {
            return await userModel.updateOne({_id: uid}, updatedUser)
        } catch (error) {
            return new Error(error)
        }
    }

    async deleteUser(uid) {
        try {
            return await userModel.deleteOne({_id: uid})
        } catch (error) {
            return new Error(error)
        }
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = UserManagerMongo