// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class UserDaoMemory {
    constructor() {
        this.users = []
    }

    getUsers = () => this.users

    getUserById = (uid) => this.users.find(user => uid === user.id)

    getUserByEmail = (email) => this.users.findOne(user => email === user.email)

    getUserByUsername = (username) => this.users.findOne(user => username === user.username)

    addUser = (newUser) => this.users.push(newUser)

    updateUser = (uid, updatedUser) => {
        const index = this.users.findIndex(user => uid === user.id)
        if (index !== -1) {
            this.users[index] = updatedUser
            return true
        }
        return false
    }

    deleteUser = (uid) => {
        const index = this.users.findIndex(user => uid === user.id)
        if (index !== -1) {
            this.users.splice(index, 1)
            return true
        }
        return false
    }
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = UserDaoMemory