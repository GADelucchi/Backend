// Imports
const { Router } = require(`express`)
const { logger } = require("../config/logger")

// Declaración
const router = Router()

// Configuración
router.get('/', (req, res) => {
    // logger.fatal('fatal')
    logger.error('error')
    // logger.warning('warning')
    // logger.info('info')
    // logger.http('http')
    // logger.debug('debug')
    res.send('Probando logger')
})


// Export
module.exports = router 