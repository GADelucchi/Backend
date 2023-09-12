const { Command } = require('commander')

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'production')
    .requiredOption('-u <user>', 'Usuario utilizando la app', 'No se ha declarado un usuario')
    .option('-l, --letters [letters...]', 'specify letters')

program.parse()

console.log('Options: ', program.opts())
console.log('Remaining arguments: ', program.args);