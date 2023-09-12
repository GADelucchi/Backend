const bcrypt = require(`bcrypt`)

// Creación del hash
exports.createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Comparación
exports.isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}