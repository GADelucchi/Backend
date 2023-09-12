// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { MongoSingleton } = require("../utils/singleton");

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    connectDB: async () => {
        try {
            await MongoSingleton.getInstance()
        }
        catch (error) {
            console.log(error)
        }
    }
}