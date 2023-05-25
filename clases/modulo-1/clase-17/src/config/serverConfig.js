// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { connect } = require(`mongoose`)

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
let url = `mongodb+srv://GADelucchi:jxDkAb8tanYj2L1x@cluster0.nxdvhds.mongodb.net/ecommerce`

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    connectDB: () => {
        connect(url)
        console.log(`Base de datos conectada`);
    }
}