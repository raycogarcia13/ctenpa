module.exports = {
    async getUsers() {
        const us = app.db.models.Usuario.findAll()
        // return us;
        console.log(us);
    },
    async getUserById(id) {
        const currentUser = await app.db.models.Usuario.findByPk(id)
        return currentUser
    },
    async createOrUpdateUser(user) {
        console.log(user.id);
        let id = user.id;
        if (id) {
            const updatedUser = await app.db.models.Usuario.update(user, {
                where: {
                    id: id
                }
            })
            return updatedUser
        }
        const newUser = await app.db.models.Usuario.create(alimento)
        return newUser
    },
    async deleteUser(id) {
        const deletedTask = await app.db.models.Usuario.destroy({
            where: {
                id: id
            }
        })
        return deletedTask
    }
}