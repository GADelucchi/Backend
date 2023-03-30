const fs = require('fs')


const date = new Date().toLocaleDateString()
const time = new Date().toLocaleTimeString()



fs.writeFile(`./1-dateAndHour.txt`, `Fecha: ${date}\nHora: ${time}`, `utf-8`, (error) => {
    if (error) console.log(error);
})

fs.readFile(`./1-dateAndHour.txt`, `utf-8`, (error, readedDate) => {
    if (error) console.log(error);
    console.log(readedDate)
})