const { persistence } = require("../../process/config");
const { connectDB } = require("../config/serverConfig");

let UserDao
let ProductDao
let ContactDao

switch (persistence) {
    case 'MONGO':
        connectDB()
        const UserDaoMongo = require('./mongo/user.mongo')
        const ProductDaoMongo = require('./mongo/product.mongo')
        const ContactDaoMongo = require('./mongo/contact.mongo')

        UserDao = UserDaoMongo
        ProductDao = ProductDaoMongo
        ContactDao = ContactDaoMongo
        break;

    case 'FILE':
        const UserDaoFile= require('./file/user.file')
        const ProductDaoFile = require('./file/product.file')
        const ContactDaoFile = require('./file/contact.file')

        UserDao = UserDaoFile
        ProductDao = ProductDaoFile
        ContactDao = ContactDaoFile
        break;
        
        case 'MEMORY':
        const UserDaoMemory = require('./memory/product.memory')
        const ProductDaoMemory = require('./memory/user.memory')
        const ContactDaoMemory = require('./memory/contact.memory')

        UserDao = UserDaoMemory
        ProductDao = ProductDaoMemory
        ContactDao = ContactDaoMemory
        break;

    default:
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    ContactDao
}