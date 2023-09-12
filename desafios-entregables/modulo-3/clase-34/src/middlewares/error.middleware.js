const { EError } = require("../utils/CustomError/EErrors");

exports.errorHandler = (err, req, res, next) => {
    console.log(err.cause)
    switch (err.code) {
        case EError.INVALID_ERROR:
            return res.send({
                status: 'Error',
                error: err.name
            })
            break;
    
        default:
            return res.send({
                status: 'Error',
                error: 'Unhandled Error'
            })
            break;
    }
}