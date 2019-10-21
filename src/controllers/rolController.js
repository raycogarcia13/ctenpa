module.exports = app => {
    const rol = app.db.models.Rol;
    return {
        getRoles: async (req, res) => {
            let us = await app.db.models.Rol.findAll()
            return res.status(200).json(us);
        },
        getRolById: async (req, res) => {
            console.log(req.body.id);
            let currentRol = await rol.findByPk(req.body.id)
            return res.status(200).json(currentRol);
        },
        createOrUpdateRol: async (req, res) => {
            console.log(req.body.id);
            let id = req.body.id;
            if (id) {
                const updRol = await rol.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updRol)
            }
            const newRol = await rol.create(req.body)
            return res.status(200).json(newRol);
        },
        deleteRol: async (req, res) => {
            let id = req.body.id;
            const deletedTask = await rol.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}