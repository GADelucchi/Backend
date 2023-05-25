- use colegio
- db.createCollection(`estudiantes`)
- db.estudiantes.insertMany([{
nombre: `Gastón`,
apellido: `Delucchi`,
curso: `Backend`,
edad: `25`,
correo: `gdelucchi@me.com`,
sexo: `M`
},
{
nombre: `Melina`,
apellido: `Beguiristain`,
curso: `Medicina`,
edad: `24`,
correo: `beguiristainmelina@hotmail.es`,
sexo: `F`
},
{
nombre: `Gonzalo`,
apellido: `Muriado`,
curso: `Comerciante`,
edad: `40`,
correo: `gonzalomuriado83@gmail.com`,
sexo: `M`
},
{
nombre: `Fabiana`,
apellido: `Marmissolle`,
curso: `Oncóloga`,
edad: `56`,
correo: `oncologa@gmail.com`,
sexo: `F`
},
{
nombre: `Guido`,
apellido: `Delucchi`,
curso: `Medicina`,
edad: `22`,
correo: `jorgedelucchi@gmail.com`,
sexo: `M`
}
])
- db.estudiantes.insertOne({
    nombre: `Pedro`,
    apellido: `Bergna`,
    curso: `Medicina`,
})
- db.estudiantes.find({})
- db.estudiantes.find({sexo: `M`})
- db.estudiantes.countDocuments()
- db.estudiantes.countDocuments({sexo: `F`})
