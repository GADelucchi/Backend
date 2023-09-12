const { logger } = require("../config/logger");
const productsController = require("../controllers/products.controller");
const { RouterClass } = require("./routerClass");

class ViewRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], async (req, res) => {
            try {

                const { limit = 10, page = 1, category = {}, sort = {} } = req.query
                const products = await productsController.getProductsPaginated(limit, page, category, sort)

                const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = products
                res.status(200).render(`productsInit`, {
                    status: `Success`,
                    docs,
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