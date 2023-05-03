// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { connect } = require(`mongoose`)

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
let url = `mongodb://localhost:27017/miPrimeraBase`

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    connectDB: () => {
        connect(url)
        console.log(`Base de datos conectada`);
    }
}