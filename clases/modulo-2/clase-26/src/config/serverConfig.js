// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { connect } = require(`mongoose`);
const { mongoUrl } = require("../../process/config");


// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
let url = mongoUrl

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    connectDB: () => {
        connect(url)
        console.log(`Base de datos conectada`);
    }
}