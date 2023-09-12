const http = require(`http`)

const server = http.createServer((peticion, respuesta) => {
    respuesta.end(`Hola Coder, funciona mejor que la app de CodeHouse`)
})

server.listen(8000, () => {
    console.log(`Escuchando el puerto 8000`);
})