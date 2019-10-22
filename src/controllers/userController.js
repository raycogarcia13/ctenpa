import bcrypt from 'bcrypt'

module.exports = app => {
    const user = app.db.models.Usuario;
    return {
        getUsers: async (req, res) => {
            let us = await user.findAll()
            return res.status(200).json(us);
        },
        getUserById: async (req, res) => {
            let currentUser = await user.findByPk(req.params.id, {
                include: [{
                    model: app.db.models.Rol,
                }]
            })
            return res.status(200).json(currentUser);
        },
        UpdateUser: async (req, res) => {
            try {
                const salt = await bcrypt.genSalt(16);
                const hashed = await bcrypt.hashSync(req.body.password, salt);

                let insertUser = {
                    username: req.body.username,
                    descripcion: req.body.descripcion,
                    password: hashed,
                    email: req.body.email,
                    RolId: req.body.RolId
                }
                //    actualizar en caso de q pase el id
                let id = req.params.id;
                if (id) {
                    const updUser = await user.update(insertUser, {
                        where: {
                            id: id
                        }
                    })
                    return res.status(201).json(updUser)
                }
            } catch (error) {
                res.status(500).send();
            }


        },

        createUser: async (req, res) => {
            try {
                const salt = await bcrypt.genSalt(16);
                const hashed = await bcrypt.hashSync(req.body.password, salt);

                let insertUser = {
                    username: req.body.username,
                    descripcion: req.body.descripcion,
                    password: hashed,
                    email: req.body.email,
                    RolId: req.body.RolId
                }
                const newUser = await user.create(insertUser)
                return res.status(201).json(newUser);
            } catch (error) {
                res.status(500).send();
            }
        },
        deleteUser: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await user.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino el usuario');
            return res.status(200).json(deletedTask)

        },


    }

}