const { jwtPrivateKey } = require("../../process/config");
const { logger } = require("../config/logger");
const { PaymentsService } = require("../service/payments.service");
const { RouterClass } = require("./routerClass");
const jwt = require('jsonwebtoken')

const products = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 },
    { id: 5, name: "golosinas", price: 800 }
]

class PaymentsRouter extends RouterClass {
    init() {
        this.post('/payment-intents', ['PUBLIC'], async (req, res) => {
            try {
                const productRequested = products.find(product => product.id === Number(req.query.id))

                if (!productRequested) return res.status(404).send({
                    status: 'Error',
                    message: 'Product not found'
                })

                const paymentIntentInfo = {
                    amount: productRequested.price,
                    currency: 'USD',
                }

                const service = new PaymentsService()
                let result = await service.createPaymentIntent(paymentIntentInfo)

                res.send({
                    status: 'Success',
                    payload: result
                })
            } catch (error) {
                logger.error(error)
            }
        })
    }
}

module.exports = PaymentsRouter