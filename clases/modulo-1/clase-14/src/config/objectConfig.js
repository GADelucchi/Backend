const { connect } = require(`mongoose`)

let url = `mongodb+srv://GADelucchi:jxDkAb8tanYj2L1x@cluster0.nxdvhds.mongodb.net/users`

module.exports = {
    connectDB: () => {
        connect(url)
        console.log(`Base de datos conectada`);
    }
}