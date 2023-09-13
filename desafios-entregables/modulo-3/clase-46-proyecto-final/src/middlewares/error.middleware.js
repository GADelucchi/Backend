const { logger } = require("../config/logger");
const { EError } = require("../utils/CustomError/EErrors");

exports.errorHandler = (err, req, res, next) => {
    logger.error(err)
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
                message: 'Unhandled Error',
                error: err
            })
            break;
    }
}