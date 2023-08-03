class ProductDto {
    constructor(product) {
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this.thumbnail = product.thumbnail,
        this.stock = product.stock,
        this.category = product.category,
        this.code = product.code
    }
}

module.exports = {
    ProductDto
}