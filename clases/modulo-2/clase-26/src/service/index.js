const CartManagerMongo = require("../dao/mongo/cart.mongo");
const MessageManagerMongo = require("../dao/mongo/message.mongo");
const OrderManagerMongo = require("../dao/mongo/order.mongo");
const ProductManagerMongo = require("../dao/mongo/product.mongo");
const UserManagerMongo = require("../dao/mongo/user.mongo");

const cartService = new CartManagerMongo()
const messageService = new MessageManagerMongo()
const orderService = new OrderManagerMongo()
const userService = new UserManagerMongo()
const productService = new ProductManagerMongo()

module.exports = {
    cartService,
    messageService,
    orderService,
    userService,
    productService
}