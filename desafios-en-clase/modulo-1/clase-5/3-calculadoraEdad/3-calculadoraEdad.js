const moment = require(`moment`)

let hoy = moment()

let nacimiento = moment(`1997-07-03`, `YYYY`)

if (hoy.isValid() && nacimiento.isValid()) {
    let diferencia = hoy.diff(nacimiento, `years`)
    console.log(diferencia);
}
