// hablando de const, que noo sea reasignable, no es lo mismo que que sea inmutable. Por ejemplo, si se usa un array o un objeto se pueden cambiar los valores dee lo que este dentro

// clases crea objetos

// un objeto es una instancia de una clase
class Contador {
    constructor(responsable) {
        this.responsable = responsable
        this.contador = 0
    }

    static contadorGlobal = 0

    getResponsable() {
        return this.responsable
    }

    contar(){
        this.contador++
        Contador.contadorGlobal++
    }
    getCuentaIndividual(){
        return this.contador
    }
    getCuentaGlobal(){
        return Contador.contadorGlobal
    }

}


// instancia de la clase Contador
const contador = new Contador('Fede')

console.log('contador 1:',contador.getResponsable())
console.log('contador 1:',contador.getCuentaIndividual())
console.log('contador 1:',contador.getCuentaGlobal())
// contador.()
contador.contar()
contador.contar()
contador.contar()
contador.contar()
console.log('contador 1:',contador.getCuentaIndividual())
console.log('contador 1:',contador.getCuentaGlobal())
// contador.getCuentaIndividual()
// contador.getCuentaGlobal()

const contador2 = new Contador('Juan')
console.log('contador 2:',contador2.getCuentaIndividual())
console.log('contador 2:',contador2.getCuentaGlobal())
