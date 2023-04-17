const { Router } = require(`express`)
const ProductsManager = require(`../managerDaos/productsManager`)


const router = Router()
const productsManager = new ProductsManager


router.get(`/`, async (req, res) => {
    try {
        const { limit } = req.query
        const allProducts = await productsManager.getProducts()

        if (!limit) {
            return res.status(200).send({
                status: `Success`,
                payload: allProducts
            })
        }
        return res.status(200).send({
            status: `Success`,
            payload: allProducts.slice(0, limit)
        })
    } catch (error) {
        res.status(400).send({
            status: `Failed`,
            error: `No existe el archivo en la ubicación especificada`
        })
    }
})

router.get(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const findedProduct = await productsManager.getProductById(parseInt(pid))

        if (findedProduct) return res.status(202).send({
            status: `Success`,
            payload: findedProduct
        })
    } catch (error) {
        return res.status(400).send({
            status: `Failed`,
            message: `Error: No existe ningún producto con ese ID`,
            error: error
        })
    }
})

router.post(`/`, async (req, res) => {
    try {
        const product = req.body
        const addedProduct = await productsManager.addProduct(product)

        if (addedProduct === `Todos los campos son obligatorios` ||
            addedProduct === `No se permiten códigos repetidos`) {
            res.status(400).send({
                status: `Failed`,
                message: `Error: ${addedProduct}`
            })
        } else if (addedProduct != `Error: Todos los campos son obligatorios`) {
            res.status(200).send({
                status: `Success`,
                payload: addedProduct
            })
        }
    } catch (error) {
        return error;
    }
})

router.put(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const product = req.body
        const modificatedProduct = await productsManager.updateProduct(parseInt(pid), product)

        if (modificatedProduct === `Producto modificado exitosamente`) {
            res.status(200).send({
                status: `Success`,
                message: modificatedProduct
            })
        } else {
            res.status(404).send({
                status: `Failed`,
                message: modificatedProduct
            })
        }
    } catch (error) {
        return error
    }
})

router.delete(`/:pid`, async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await productsManager.deleteProduct(parseInt(pid))
        // console.log(deletedProduct);

        deletedProduct === `Producto eliminado exitosamente` ?
            res.status(200).send({
                status: `Success`,
                message: deletedProduct
            })
            :
            res.status(404).send({
                status: `Failed`,
                message: `Error: ID no encontrado`
            })
    } catch (error) {
        return error
    }
})


module.exports = router