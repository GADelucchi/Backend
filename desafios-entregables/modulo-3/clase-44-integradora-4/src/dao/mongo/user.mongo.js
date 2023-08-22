// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { userModel } = require(`./models/user.model`)

// Clase ––––––––––––––––––––––––––––––––––––––––––––––––––––
class UserDaoMongo {
    constructor() {
        this.model = userModel
    }

    get = async () => await this.model.find({})

    getPaginated = async (page) => await this.model.paginate({}, { limit: 10, page: page, lean: true })

    getById = async (uid) => await this.model.findOne({ _id: uid })

    getByEmail = async (email) => await this.model.findOne({ email })

    create = async (newUser) => await this.model.create(newUser)

    update = async (uid, updatedUser) => await this.model.updateOne({ _id: uid }, updatedUser)

    updateLastConection = async (email) => await this.model.updateOne({ email }, { $currentDate: { "last_connection": { $type: "date" } } })

    delete = async (uid) => await this.model.deleteOne({ _id: uid })
}

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = UserDaoMongo