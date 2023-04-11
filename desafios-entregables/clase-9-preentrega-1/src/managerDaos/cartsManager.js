const fs = require(`fs`)

class CartsManager {
    constructor() {
        this.path = `./data/carts.json`
    }

    addCart = async (cart) => {
        try {
            if (!cart.products) return `Todos los campos son obligatorios`

            let parsedCarts = []

            if (fs.existsSync(this.path)) {
                let content = await fs.promises.readFile(this.path, `utf-8`)
                parsedCarts = JSON.parse(content)
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), `utf-8`)
            }

            if (parsedCarts.length === 0) {
                cart.id = 1
            } else {
                cart.id = parsedCarts[parsedCarts.length - 1].id + 1
            }
            parsedCarts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(parsedCarts, null, 2), `utf-8`)
            return parsedCarts
        } catch (error) {
            return error
        }
    }

    getCartById = async (cid) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedCarts = JSON.parse(content)

            let findId = parsedCarts.find(cart => cart.id === cid)

            if (!findId) {
                throw new Error(`Error: No existe ningún carrito con ese ID`)
            }
            return findId.products
        } catch (error) {
            throw new Error({
                message: `Error: No existe ningún carrito con ese ID`,
                error: error
            })
        }
    }
}

module.exports = CartsManager

// const cartManager = new CartsManager

// cartManager.addCart({
//     products: [`Sprite`]
// })