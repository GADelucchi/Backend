const { UserDao, ProductDao, TicketDao, CartDao } = require("../dao/factory");
const MessageDaoMongo = require("../dao/mongo/message.mongo");
const OrderDaoMongo = require("../dao/mongo/order.mongo");
const { CartRepository } = require("../repositories/cart.repository");
const { ProductRepository } = require("../repositories/product.repository");
const { TicketRepository } = require("../repositories/ticket.repository");
const { UserRepository } = require("../repositories/user.repository");

const cartService = new CartRepository(new CartDao())
const productService = new ProductRepository(new ProductDao())
const messageService = new MessageDaoMongo()
const orderService = new OrderDaoMongo()
const ticketService = new TicketRepository(new TicketDao())
const userService = new UserRepository(new UserDao())

module.exports = {
    userService,
    productService,
    cartService,
    messageService,
    orderService,
    ticketService
}