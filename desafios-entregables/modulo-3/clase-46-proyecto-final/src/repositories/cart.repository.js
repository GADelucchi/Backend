class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => await this.dao.get()

    getById = async (cid) => await this.dao.getById(cid)

    create = async (newCart) => await this.dao.create(newCart)

    update = async (cid, pid, quantity) => await this.dao.update(cid, pid, quantity)

    deleteProductInCart = async (cid, pid) => await this.dao.deleteProductInCart(cid, pid)

    deleteProducts = async (cid) => await this.dao.deleteProducts(cid)

    deleteCart = async (cid) => await this.dao.deleteCart(cid)
}

module.exports = {
    CartRepository
}