const cluster = require('cluster')
const { cpus } = require('os')
const { initServer } = require("./src/server");
const { logger } = require('./src/config/logger');

// logger.info(cluster.isPrimary)
const numeroDeProcesadores = cpus().length
// logger.info('Cantidad de hilos de ejecución de mi procesador: ' + numeroDeProcesadores)

if (cluster.isPrimary) {
    logger.info('Proceso primario, generando proceso trabajador')
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()
    }
    cluster.on('message', worker => {
        logger.info(`El worker ${worker.process.id} dice ${worker.message}`)
    })
} else {
    logger.info('Al ser un proceso forkeado, no cuento como primario; por lo tanto isPrimary en false, soy un worker')
    initServer()
}
