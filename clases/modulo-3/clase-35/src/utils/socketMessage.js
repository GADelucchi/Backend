exports.socketMessage = (io) => {
    let messages = []
    io.on(`connection`, socket => {
        logger.info(`Nuevo cliente conectado`)

        socket.on(`message`, (data) => {
            messages.push(data)
            io.emit(`messageLogs`, messages)
            logger.error(error)
        })

        socket.on(`authenticated`, data => {
            socket.broadcast.emit(`newUserConnected`, data)
        })
    })
}