// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { MongoSingleton } = require("../utils/singleton");
const { logger } = require("./logger");

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    connectDB: async () => {
        try {
            await MongoSingleton.getInstance()
        }
        catch (error) {
            logger.error(error)
        }
    }
}