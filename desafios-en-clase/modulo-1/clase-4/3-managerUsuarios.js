const fs = require(`fs`)

class Users {
    constructor() {
        this.users = []
    }

    createUser(name, username, age, course) {
        const user = {
            name,
            username,
            age,
            course
        }

        if (!user.name ||
            !user.username ||
            !user.age ||
            !user.course) return `Todos los campos son obligatorios`

            this.users.push(user)
            console.log(this.users);

            fs.writeFileSync(`./3-usuarios.json`, JSON.stringify(this.users, null, 2), `utf-8`,)
    }

    getUsers() {
        let content = fs.readFileSync(`./3-usuarios.json`, `utf-8`)
        let parseContent = JSON.parse(content)
        console.log(parseContent);
    }
}

const usuario = new Users

usuario.getUsers()