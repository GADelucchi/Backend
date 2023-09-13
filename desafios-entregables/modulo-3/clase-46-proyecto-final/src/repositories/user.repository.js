class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => await this.dao.get()

    getPaginated = async (page) => await this.dao.getPaginated(page)

    getById = async (uid) => await this.dao.getById(uid)

    getByEmail = async (email) => await this.dao.getByEmail(email)

    getByUsername = async (username) => await this.dao.getByUsername(username)

    create = async (newUser) => await this.dao.create(newUser)

    update = async (uid, updatedUser) => await this.dao.update(uid, updatedUser)

    updateLastConection = async (email) => await this.dao.updateLastConection(email)

    delete = async (uid) => await this.dao.delete(uid)

    findUsers = async (connectionLimit) => await this.dao.findUsers(connectionLimit)
}

module.exports = {
    UserRepository
}