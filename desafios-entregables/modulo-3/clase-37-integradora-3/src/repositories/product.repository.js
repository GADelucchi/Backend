class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => await this.dao.get()

    getPaginated = async () => await this.dao.getPaginated()

    getById = async (pid) => await this.dao.getById(pid)

    create = async (newProduct) => await this.dao.create(newProduct)

    update = async (pid, updatedProduct) => await this.dao.update(pid, updatedProduct)

    delete = async (pid) => await this.dao.delete(pid)
}

module.exports = {
    ProductRepository
}