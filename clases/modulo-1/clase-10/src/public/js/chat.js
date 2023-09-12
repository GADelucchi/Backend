console.log(`Socket`);
const socket = io()

socket.emit(`message`, `Hola me estoy comunicando desde un cliente socket`)

socket.on(`evento-para-socket-individual`, data => {
    console.log(data);
})

socket.on(`evento-para-todos-menos-el-socket-actual`, data => {
    console.log(data);
})

socket.on(`evento-para-todos`, data => {
    console.log(data);
})