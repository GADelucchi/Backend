const { persistence } = require("../../process/config");
const { connectDB } = require("../config/serverConfig");

let UserDao
let ProductDao
let TicketDao
let CartDao

switch (persistence) {
    case 'MONGO':
        connectDB()
        const UserDaoMongo = require('./mongo/user.mongo')
        const ProductDaoMongo = require('./mongo/product.mongo')
        const TicketDaoMongo = require('./mongo/ticket.mongo')
        const CartDaoMongo = require('./mongo/cart.mongo')

        UserDao = UserDaoMongo
        ProductDao = ProductDaoMongo
        TicketDao = TicketDaoMongo
        CartDao = CartDaoMongo
        break;

    case 'FILE':
        const UserDaoFile= require('./file/user.file')
        const ProductDaoFile = require('./file/product.file')

        UserDao = UserDaoFile
        ProductDao = ProductDaoFile
        break;
        
        case 'MEMORY':
        const UserDaoMemory = require('./memory/product.memory')
        const ProductDaoMemory = require('./memory/user.memory')

        UserDao = UserDaoMemory
        ProductDao = ProductDaoMemory
        break;

    default:
        break;
}

module.exports = {
    UserDao,
    ProductDao,
    TicketDao,
    CartDao
}