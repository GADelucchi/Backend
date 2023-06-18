const UserManagerMongo = require("../dao/mongo/user.mongo");

const userService = new UserManagerMongo()

module.exports = {
    userService
}