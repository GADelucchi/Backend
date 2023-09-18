const { jwtPrivateKey } = require("../../process/config");
const { logger } = require("../config/logger");
const productsController = require("../controllers/products.controller");
const { RouterClass } = require("./routerClass");
const jwt = require('jsonwebtoken')

class ViewRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {
                const { limit = 10, page = 1, category = {}, sort = {} } = req.query
                const products = await productsController.getProductsPaginated(limit, page, category, sort)
                let userDB

                if (req.cookies.accessToken) {
                    const token = req.cookies.accessToken
                    jwt.verify(token, jwtPrivateKey, (error, credential) => {
                        userDB = credential.user
                    })
                }

                const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
                const productsWithCartId = req.cookies.accessToken
                    ? docs.map((product) => ({
                        ...product,
                        cartId: userDB.cart,
                    }))
                    : undefined

                res.status(200).render(`products`, {
                    status: `Success`,
                    userDB,
                    docs: productsWithCartId ? productsWithCartId : docs,
                    totalPages,
                    prevPage,
                    nextPage,
                    page,
                    hasPrevPage,
                    hasNextPage
                })
            } catch (error) {
                logger.error(error)
            }
        })

        this.get('/login', ['PUBLIC'], async (req, res) => {
            res.render('login')
        })

        this.get('/register', ['PUBLIC'], async (req, res) => {
            res.render(`registerForm`, {
                style: `index.css`
            })
        })

        this.get('/chat', ['USER', 'PREMIUM', 'ADMIN'], async (req, res) => {
            try {
                const messages = await messageService.getMessages()

                res.render(`message`, {})
            } catch (error) {
                logger.error(error)
            }
        })
    }
}

module.exports = ViewRouter