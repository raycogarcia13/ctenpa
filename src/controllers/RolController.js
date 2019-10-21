module.exports = {
    async getRoles() {
        const us = app.db.models.Rol.findAll()
        return us;
        // console.log(app.db.models.Rol);

    },
    async getRolById(id) {
        const currentRol = await app.db.models.Rol.findByPk(id)
        return currentRol
    },
    async createOrUpdateRol(rolid) {
        console.log(rolid.id);
        let id = rolid.id;
        if (id) {
            const updRol = await app.db.models.Rol.update(rolid, {
                where: {
                    id: id
                }
            })
            return updRol
        }
        const newRol = await app.db.models.Rol.create(rolid)
        return newRol
        // console.log(Rol.name);
    },
    async deleteRol(id) {
        const deletedTask = await app.db.models.Rol.destroy({
            where: {
                id: id
            }
        })
        return deletedTask
    }
}