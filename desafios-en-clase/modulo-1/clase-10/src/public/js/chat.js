console.log(`Socket`);
const socket = io()

// socket.emit(`message`, `Mensaje`)

// socket.on(`individual`, data => {
//     console.log(data);
// })

// socket.on(`todos-menos-actual`, data => {
//     console.log(data);
// })

const input = document.getElementById(`text`)
const log = document.getElementById(`messages`)

input.addEventListener(`keyup`, event => {
    if (event.key === `Enter`) {
        socket.emit(`message2`, input.value)
        input.value = ``
    }
})

socket.on(`log`, data => {
    let logs = ``
    data.logs.forEach(log => {
        logs += `<li>${log.socketid} dice: ${log.message}</li>`
    })
    log.innerHTML = logs
})