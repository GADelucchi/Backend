// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const productRouter = require(`./product.router`)
const userRouter = require(`./user.router`)
const viewRouter = require(`./view.router`)
const cartRouter = require(`./cart.router`)
const messageRouter = require(`./message.router`)
const pruebasRouter = require(`./pruebas.router`)
const { uploader } = require("../utils/multer")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.use(`/`, viewRouter)

router.use(`/api/products`, productRouter)

router.use(`/api/users`, userRouter)

router.use(`/api/carts`, cartRouter)

router.use(`/chat`, messageRouter)

router.use(`/pruebas`, pruebasRouter)

router.post(`/upload`, uploader.single(`myFile`), (req, res) => {
    res.status(200).send({
        status: `Success`,
        message: `Archivo subido con éxito`
    })
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router