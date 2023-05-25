// Imports externos –––––––––––––––––––––––––––––––––––––––
const multer = require(`multer`)
const { dirname } = require(`path`)

// Configuraicón ––––––––––––––––––––––––––––––––––––––––––
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const uploader = multer({
    storage,
    onError: (error, next) => {
        console.log(error)
        next(error)
    }
})

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = {
    uploader
}