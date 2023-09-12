const { Command } = require('commander')

const commander = new Command()

commander.option('--mode <mode>', 'Modo de trabajo', 'production')

commander.parse()

console.log('Options: ', commander.opts())
console.log('Remaining arguments: ', commander.args);

module.exports = { 
    commander
}