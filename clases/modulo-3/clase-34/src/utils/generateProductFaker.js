const { faker } = require('@faker-js/faker')

const generateProduct = () => {
    let products = []
    for (let i = 0; i < 50; i++) {
        products.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            department: faker.commerce.department(),
            stock: faker.string.numeric(),
            description: faker.commerce.productDescription(),
            id: faker.database.mongodbObjectId(),
            image: faker.image.url()
        })
    }

    return products
}

module.exports = {
    generateProduct
}