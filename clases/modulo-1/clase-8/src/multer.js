const multer = require(`multer`)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/public/uploads`)
    },
    filename: function (req, file, cb) {
        console.log(`File: `, file);
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage,
    onError: function (err, next) {
        console.log(err);
        next()
    }
})

module.exports = { uploader }