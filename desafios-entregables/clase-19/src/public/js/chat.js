console.log(`Socket`);
const socket = io()
let user
let chatbox = document.getElementById(`chatbox`)
let toast

Swal.fire({
    title: `Identificate`,
    input: `text`,
    text: `Ingresar el nombre de usuario`,
    inputValidator: (value) => {
        return !value && `El nombre de usuario es obligatorio`
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value
    socket.emit(`authenticated`, user)
})

chatbox.addEventListener('keyup', event => {
    if (event.key === `Enter`) {
        if (chatbox.value.trim().length > 0) {
            socket.emit(`message`, {
                user,
                message: chatbox.value,
            })
            chatbox.value = ``
        }
    }
})

socket.on(`messageLogs`, data => {
    let log = document.getElementById(`messageLogs`)
    let mensajes = ``
    data.forEach(({user, message}) => {
        mensajes += `<li>${user} dice: ${message}</li>`
    })
    log.innerHTML = mensajes
})

socket.on(`newUserConnected`, user => {
        Swal.fire({
        title: `${user} se ha conectado`,
        toast:true,
        position: `top-right`,
        timer: 5000,
        icon: `success`,
        showConfirmButton: false
    })
})