// Import
const { messageService } = require("../service")

// Code
class ViewController {
    get = async (req, res) => {
        res.render(`login`, {})
    }

    getRealTime = (req, res) => {
        res.render(`realTimeProducts`)
    }

    getLogin = (req, res) => {
        res.render(`login`, {
            style: `index.css`
        })
    }

    getRegister = (req, res) => {
        res.render(`registerForm`, {
            style: `index.css`
        })
    }

    getChat = (req, res) => {
        const messages = messageService.getMessages()
    
        res.render(`message`, {})
    }
}

// Export
module.exports = new ViewController()