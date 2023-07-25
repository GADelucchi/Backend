const { Command } = require('commander')
const { logger } = require('../src/config/logger')

const commander = new Command()

commander.option('--mode <mode>', 'Modo de trabajo', 'production')

commander.parse()

logger.info('Options: ', commander.opts())
logger.info('Remaining arguments: ', commander.args);

module.exports = {
    commander
}