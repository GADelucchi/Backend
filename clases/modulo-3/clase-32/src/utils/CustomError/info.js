exports.generateUserErrorInfo = (user) => {
    return `One or more properties were incompleted or invalid.
    Listado de requerimientos de propiedades del user:
    * username: needs to a String, received ${user.username}
    * fisrt_name: needs to a String, received ${user.first_name}
    * last_name: needs to a String, received ${user.last_name}
    * email: needs to a String, received ${user.email}`
}

exports.generateProductErrorInfo = (product) => {
    return `One or more properties were incompleted or invalid.
    Listado de requerimientos de propiedades del user:
    * title: needs to a String, received ${product.title}
    * description: needs to a String, received ${product.description}
    * price: needs to a String, received ${product.price}
    * thumbnail: needs to a String, received ${product.thumbnail}
    * stock: needs to a String, received ${product.stock}
    * category: needs to a String, received ${product.category}
    * code: needs to a String, received ${product.code}`
}