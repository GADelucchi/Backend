const fs = require(`fs`)


// Creamos la clase
class PetsManager {
    // Definimos su constructor
    constructor() {
        this.pets = []
        this.path = `./pets.json`
    }

    // Definimos los métodos
    // Método para agregar mascotas y validar los campos
    addPet = async (type, description, price, thumbnail, code, stock) => {
        try {
            // Datos de la mascota
            const pet = {
                type,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            // Validaciones
            if (!pet.type ||
                !pet.description ||
                !pet.price ||
                !pet.thumbnail ||
                !pet.code ||
                !pet.stock) return console.log(`Error: Todos los campos son obligatorios`);


            if (fs.existsSync(this.path)) {
                let content = await fs.promises.readFile(this.path, `utf-8`)
                content ? this.pets = JSON.parse(content) : null
            }

            let findCode = this.pets.find(prod => prod.code === pet.code)
            if (findCode) return console.log(`Error: No se permiten códigos repetidos`);

            this.pets.push({ id: this.pets.length + 1, ...pet })
            await fs.promises.writeFile(this.path, JSON.stringify(this.pets, null, 2), `utf-8`)

            return console.log(`Mascota cargada correctamente`);
        }
        catch (error) {
            return console.log(error)
        }

    }

    // Método para mostrar las mascotas
    getPets = async () => {
        try {
            const content = await fs.promises.readFile(this.path, `utf-8`)
            this.pets = JSON.parse(content)
            return this.pets
        }
        catch (error) {
            return []
        }
    }

    // Método para buscar una mascota por ID
    getPetById = async (pid) => {
        try {
            const content = await fs.promises.readFile(this.path, `utf-8`)
            this.pets = JSON.parse(content)
            let findId = this.pets.find(prod => prod.id === pid)
            if (!findId) return console.log('Not found')
            return findId
        }
        catch (error) {
            return console.log(error);
        }
    }

    updatePets = async (id, updatedpet) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.pets = JSON.parse(content)
            let petAsked = this.pets.find(prod => prod.id === id)

            if (!petAsked) return console.log(`Error: Mascota no encontrada`);
            petAsked.type = updatedpet.type || petAsked.type
            petAsked.description = updatedpet.description || petAsked.description
            petAsked.price = updatedpet.price || petAsked.price
            petAsked.thumbnail = updatedpet.thumbnail || petAsked.thumbnail
            petAsked.stock = updatedpet.stock || petAsked.stock
            petAsked.code = updatedpet.code || petAsked.code
            petAsked.id = petAsked.id

            this.pets[this.pets.indexOf(petAsked)] = petAsked
            await fs.promises.writeFile(this.path, JSON.stringify(this.pets, null, 2), `utf-8`)
            return console.log(`Mascota modificada exitosamente`);

        } catch (error) {
            return console.log(error);
        }
    }

    deletePets = async (idDelete) => {
        try {
            let content = await fs.promises.readFile(this.path, `utf-8`)
            this.pets = JSON.parse(content)
            const removepet = this.pets.filter(prod => prod.id !== idDelete)
            if (!removepet) return console.log(`Error: ID no encontrado`)
            console.log(removepet)
            await fs.promises.writeFile(this.path, JSON.stringify(removepet, null, 2), `utf-8`)
            return console.log(`Mascota eliminada exitosamente`)
        }
        catch (error) {
            return console.log(error)
        }
    }
}


module.exports = PetsManager