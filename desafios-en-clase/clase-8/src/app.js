const express = require(`express`)

const petsRouter = require(`./routes/pets.router`)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/static`, express.static(__dirname + `/public`))


app.use(`/api/pets`, petsRouter)


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})