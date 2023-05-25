// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const productRouter = require(`./product.router`)
const userRouter = require(`./user.router`)
const { uploader } = require("../utils/multer")

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.use(`/api/products`, productRouter)

router.use(`/api/users`, userRouter)

router.post(`/upload`, uploader.single(`myFile`), (req, res) => {
    res.status(200).send({
        status: `Success`,
        message: `Archivo subido con éxito`
    })
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router