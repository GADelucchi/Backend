const winston = require('winston');
const { enviroment } = require('../../process/config');

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'white'
    }
}

if (enviroment === 'development') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errorsDev.log',
                level: 'error',
                format: winston.format.simple()
            })
        ]
    })
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errorsProd.log',
                level: 'error',
                format: winston.format.simple()
            })
        ]
    })
}

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

module.exports = {
    logger,
    // addLogger
}