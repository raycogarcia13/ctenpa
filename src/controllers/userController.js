module.exports = app => {
    const user = app.db.models.Usuario;
    return {
        getUsers: async (req, res) => {
            let us = await user.findAll()
            return res.status(200).json(us);
        },
        getUserById: async (req, res) => {
            console.log(req.body.id);
            let currentUser = await user.findByPk(req.body.id)
            return res.status(200).json(currentUser);
        },
        createOrUpdateUser: async (req, res) => {
            console.log(req.body.id);
            let id = req.body.id;
            if (id) {
                const updUser = await user.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updUser)
            }
            const newUser = await rol.create(req.body)
            return res.status(200).json(newUser);
        },
        deleteUser: async (req, res) => {
            let id = req.body.id;
            const deletedTask = await user.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino el usuario');
            return res.status(200).json(deletedTask)

        }
    }

}