// Imports
const { Router } = require('express')
const sessionRouter = require('./session.router')
const UsersRouter = require('./user.routerGeneric')
const TicketsRouter = require('./ticket.routerGeneric')
const CartsRouter = require('./cart.routerGeneric')
const ProductRouter = require('./product.routerGeneric')
const ViewRouter = require('./view.routerGeneric')

// Declaration
const router = Router()
const usersRouter = new UsersRouter()
const ticketsRouter = new TicketsRouter()
const cartsRouter = new CartsRouter()
const productsRouter = new ProductRouter()
const viewsRouter = new ViewRouter()

// Code
router.use(`/`, viewsRouter.getRouter())

router.use(`/api/products`, productsRouter.getRouter())

router.use(`/api/users`, usersRouter.getRouter())

router.use(`/api/carts`, cartsRouter.getRouter())

router.use('/api/tickets', ticketsRouter.getRouter())

router.use(`/api/session`, sessionRouter)

// Export
module.exports = router