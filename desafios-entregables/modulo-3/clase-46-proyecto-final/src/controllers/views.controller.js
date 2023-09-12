// Import
const { messageService, productService, } = require("../service/index.service")

// Code
class ViewController {
    getChat = (req, res) => {
        const messages = messageService.getMessages()
    
        res.render(`message`, {})
    }
}

// Export
module.exports = new ViewController()