// Imports externos
const multer = require(`multer`)
const { dirname } = require(`path`)
const { logger } = require("../config/logger")

// Configuraicón
const storageProductImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirname(__dirname)}/public/uploads/productImages`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const uploaderProductImg = multer({
    storageProductImg,
    onError: (error, next) => {
        logger.error(error)
        next(error)
    }
})

const storageDocument = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirname(__dirname)}/public/uploads/documents`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const uploaderDocument = multer({
    storageDocument,
    onError: (error, next) => {
        logger.error(error)
        next(error)
    }
})

// Export
module.exports = {
    uploaderProductImg,
    uploaderDocument
}