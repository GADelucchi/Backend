// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { connect } = require(`mongoose`);
const { mongoUrl } = require("../../process/config");
const { MongoSingleton } = require("../utils/singleton");


// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
let url = mongoUrl

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    // connectDB: () => {
    //     connect(url)
    //     console.log(`Base de datos conectada`);
    // }
    connectDB: async () => {
        try {
            await MongoSingleton.getInstance()
        }
        catch (error) {
            console.log(error)
        }
    }
}