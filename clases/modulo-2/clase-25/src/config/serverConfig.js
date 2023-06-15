// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { connect } = require(`mongoose`)
require('dotenv').config()


// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
let url = process.env.MONGO_URL_LOCAL

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    connectDB: () => {
        connect(url)
        console.log(`Base de datos conectada`);
    }
}