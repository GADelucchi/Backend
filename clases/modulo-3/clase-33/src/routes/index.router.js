// Imports
const { Router } = require(`express`)
const viewRouter = require(`./view.router`)
const messageRouter = require(`./message.router`)
const { uploader } = require("../utils/multer")
const sessionRouter = require(`./session.router`)
const UsersRouter = require('./user.routerGeneric')
const TicketsRouter = require('./ticket.routerGeneric')
const CartsRouter = require('./cart.routerGeneric')
const ProductRouter = require("./product.routerGeneric")
const pruebasRouter = require('./pruebas.router')
const mockingProductsRouter = require('./mockingProducts.router')

// Declaration
const router = Router()
const usersRouter = new UsersRouter()
const ticketsRouter = new TicketsRouter()
const cartsRouter = new CartsRouter()
const productsRouter = new ProductRouter()

// Code
router.use(`/`, viewRouter)

router.use(`/api/products`, productsRouter.getRouter())

router.use(`/api/users`, usersRouter.getRouter())

router.use(`/api/carts`, cartsRouter.getRouter())

router.use('/api/tickets', ticketsRouter.getRouter())

router.use(`/api/session`, sessionRouter)

router.use(`/chat`, messageRouter)

router.use(`/pruebas`, pruebasRouter)

router.use(`/mockingproducts`, mockingProductsRouter)

router.post(`/upload`, uploader.single(`myFile`), (req, res) => {
    res.status(200).send({
        status: `Success`,
        message: `Archivo subido con éxito`
    })
})

// Export
module.exports = router