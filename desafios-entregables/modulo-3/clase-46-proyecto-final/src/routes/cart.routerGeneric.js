const { jwtPrivateKey } = require("../../process/config");
const { logger } = require("../config/logger");
const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controller");
const ticketsController = require("../controllers/tickets.controller");
const { sendMail } = require("../utils/sendMail");
const { RouterClass } = require("./routerClass");
const jwt = require('jsonwebtoken')

class CartsRouter extends RouterClass {
    init() {
        this.get('/', ['ADMIN'], async (req, res) => {
            try {
                let result = await cartsController.getCarts()

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess(result)
            } catch (error) {
                logger.error(error)
            }
        }
        )

        this.get('/:cid', ['USER', 'PREMIUM', 'ADMIN'], async (req, res) => {
            try {
                const { cid } = req.params
                const cart = await cartsController.getCartById(cid)

                if (cart === null) {
                    return res.status(400).send({
                        status: `Error`,
                        message: 'No found',
                    })
                }

                res.render('cart', {
                    cart
                })
            } catch (error) {
                logger.error(error)
            }
        })

        this.post('/:cid/purchase', ['USER', 'PREMIUM', 'ADMIN'], async (req, res) => {
            try {
                const { cid } = req.params
                const cart = await cartsController.getCartById(cid)

                if (!cart) {
                    throw new Error(`No existe ningún carrito con ese ID`)
                }

                const productIds = cart.products.map((product) => product.product._id.toString());

                const products = []

                for (const productId of productIds) {
                    const product = await productsController.getProductById(productId);
                    if (product) {
                        products.push(product);
                    }
                }

                const insufficientStock = products.filter((product) => {
                    const cartProduct = cart.products.find(
                        (item) => item.product._id.toString() === product._id.toString()
                    )
                    return cartProduct && cartProduct.quantity > product.stock;
                })

                if (insufficientStock.length > 0) {
                    const insufficientProducts = insufficientStock.map((product) => product.name);
                    throw new Error('Stock insuficiente' + insufficientProducts);
                }

                for (const cartProduct of cart.products) {
                    const product = products.find((p) => p._id.toString() === cartProduct.product._id.toString());
                    await productsController.updateProduct(cartProduct.product._id, { stock: product.stock - 1 });
                }

                function generateTicketCode() {
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const day = String(now.getDate()).padStart(2, '0');
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');

                    const code = `${year}${month}${day}${hours}${minutes}${seconds}`;
                    return code;
                }

                let totalAmount = 0;

                for (const cartProduct of cart.products) {
                    const product = products.find((p) => p._id.toString() === cartProduct.product._id.toString());
                    const productPrice = product.price;
                    const productQuantity = cartProduct.quantity;
                    const productTotal = productPrice * productQuantity;
                    totalAmount += productTotal;
                }

                const token = req.cookies.accessToken
                jwt.verify(token, jwtPrivateKey, (error, credential) => {
                    req.user = credential.user
                })

                const ticket = await ticketsController.createTicket({
                    code: generateTicketCode(),
                    purchase_datatime: new Date,
                    amount: `$${totalAmount}`,
                    purchaser: req.user.email
                })

                sendMail(req.user.email, 'Compra finalizada', `<h1>Gracias por tu compra</h1>`)

                const result = await cartsController.emptyCart(cid)

                console.log(ticket);
                res.sendSuccess(ticket)
            } catch (error) {
                logger.error(error)
            }
        })

        this.post('/', ['USER', 'PREMIUM'], async (req, res) => {
            try {
                const authCookie = req.cookies.accessToken
                const user = jwt.verify(authCookie, jwtPrivateKey)

                const cart = req.body
                cart.owner = user.user.email

                const result = await cartsController.createCart(cart)


                if (result === `Todos los campos son obligatorios`) {
                    res.status(400).send({
                        status: `Failed`,
                        message: `Error: ${result}`
                    })
                } else {
                    res.sendSuccess(result)
                }
                if (result === null) {
                    throw new Error(error)
                }

            } catch (error) {
                logger.error(error)
            }
        })

        this.put('/:cid/product/:pid', ['ADMIN'], async (req, res) => {
            try {
                const { cid, pid } = req.params
                const { quantity } = req.body
                const product = await productsController.getProductById(pid)

                if (!product) {
                    throw new Error(`No existe ningún producto con ese ID`)
                } else {
                    const result = await cartsController.updateCart(cid, pid, quantity)
                    res.sendSuccess(result)
                }
            } catch (error) {
                logger.error(error)
            }
        })

        this.delete('/:cid/product/:pid', ['USER', 'PREMIUM', 'ADMIN'], async (req, res) => {
            try {
                const { cid, pid } = req.params
                const findedProduct = await productsController.getProductById(pid)

                if (!findedProduct) {
                    throw new Error(`No existe ningún producto con ese ID`)
                } else {
                    const result = await cartsController.eraseProduct(cid, pid)
                    res.sendSuccess('Eliminado')
                }
            } catch (error) {
                logger.error(error)
            }
        })

        this.delete('/:cid', ['USER', 'PREMIUM'], async (req, res) => {
            try {
                const { cid } = req.params
                const result = await cartsController.emptyCart(cid)

                if (result === null) {
                    throw new Error(error)
                }
                res.sendSuccess('Carrito vaciado')
            } catch (error) {
                logger.error(error)
            }
        })
    }
}


module.exports = CartsRouter