const fs = require(`fs`)

class CartDaoFile {
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

            let findCartId = parsedCarts.find(cart => cart.id === cid)

            if (!findCartId) {
                throw new Error(`Error: No existe ningún carrito con ese ID`)
            }

            return findCartId
        } catch (error) {
            return console.log({
                message: `Error: No existe ningún carrito con ese ID`,
            })
        }
    }

    getCartByIdProductsById = async (cid, pid) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            let parsedCarts = JSON.parse(content)

            const cart = parsedCarts.find(cart => cart.id === cid)

            if (cart) {
                const product = cart.products.find(item => item.id === pid)

                if (!product) {
                    cart.products.push({ id: pid, quantity: 1 })
                } else {
                    product.quantity++
                }

                await fs.promises.writeFile(this.path, JSON.stringify(parsedCarts, null, 2), `utf-8`)

                } else {
                    throw new Error(`No se encontró ese carrito`)
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = CartDaoFile