const { ContactDao, UserDao, ProductDao } = require("../dao/factory");
const CartDaoMongo = require("../dao/mongo/cart.mongo");
const MessageDaoMongo = require("../dao/mongo/message.mongo");
const OrderDaoMongo = require("../dao/mongo/order.mongo");
const { ContactRepository } = require("../repositories/contact.repository");



const contactService = new ContactRepository(new ContactDao())
const userService = new UserDao()
const productService = new ProductDao()
const cartService = new CartDaoMongo()
const messageService = new MessageDaoMongo()
const orderService = new OrderDaoMongo()

module.exports = {
    contactService,
    userService,
    productService,
    cartService,
    messageService,
    orderService,
}