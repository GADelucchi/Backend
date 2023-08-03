class UserDto {
    constructor(user) {
        this.username = user.username,
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.age = user.age,
        this.role = user.role
    }
}

module.exports = {
    UserDto
}