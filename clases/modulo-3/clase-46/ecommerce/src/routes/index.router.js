// Imports
const { Router } = require('express')
const viewRouter = require('./view.router')
const { uploader } = require('../utils/multer')
const sessionRouter = require('./session.router')
const UsersRouter = require('./user.routerGeneric')
const TicketsRouter = require('./ticket.routerGeneric')
const CartsRouter = require('./cart.routerGeneric')
const ProductRouter = require('./product.routerGeneric')
const PaymentsRouter = require('./payments.routerGeneric')

// Declaration
const router = Router()
const usersRouter = new UsersRouter()
const ticketsRouter = new TicketsRouter()
const cartsRouter = new CartsRouter()
const productsRouter = new ProductRouter()
const paymentsRouter = new PaymentsRouter()

// Code
router.use(`/`, viewRouter)

router.use('/api/payments', paymentsRouter.getRouter())

router.use(`/api/products`, productsRouter.getRouter())

router.use(`/api/users`, usersRouter.getRouter())

router.use(`/api/carts`, cartsRouter.getRouter())

router.use('/api/tickets', ticketsRouter.getRouter())

router.use(`/api/session`, sessionRouter)

router.post(`/upload`, uploader.single(`myFile`), (req, res) => {
    res.status(200).send({
        status: `Success`,
        message: `Archivo subido con éxito`
    })
})

// Export
module.exports = router