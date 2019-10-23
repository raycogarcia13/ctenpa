import bcrypt from 'bcrypt'

module.exports = app => {
    const user = app.db.models.Usuario;
    return {
        getUsers: async (req, res) => {
            try {
                let us = await user.findAll()
                return res.status(200).json(us);
            } catch (error) {
                return res.status(500).send('Algun problema existio a la hora de obtener los datos');
            }

        },
        getUserById: async (req, res) => {
            try {
                let currentUser = await user.findByPk(req.params.id, {
                    include: [{
                        model: app.db.models.Rol,
                    }]
                })
                return res.status(200).json(currentUser);
            } catch (error) {
                return res.status(500).send('No se pudo obtener el usuario');
            }
        },

        UpdateUser: async (req, res) => {
            try {
                const salt = await bcrypt.genSalt(10);
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
                    return res.status(201).json(updUser).send('Update Correcto')
                }
            } catch (error) {
                res.status(500).send('No se pudo actualizar');
            }
        },

        createUser: async (req, res) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hashSync(req.body.password, salt);
                let insertUser = {
                    username: req.body.username,
                    descripcion: req.body.descripcion,
                    password: hashed,
                    email: req.body.email,
                    RolId: req.body.RolId
                }
                const newUser = await user.create(insertUser)
                console.log(insertUser, newUser);
                return res.status(201).json(newUser).send('Creado correctamente');

            } catch (error) {
                res.status(500).send('Hay errores a la hora de insertar los datos');
            }
        },
        deleteUser: async (req, res) => {
            let id = req.params.id;
            try {
                const deletedTask = await user.destroy({
                    where: {
                        id: id
                    }
                })
                res.send('se elimino el usuario');
                return res.status(200).json(deletedTask)

            } catch (error) {
                res.status(500).send('No se pudo eliminar');

            }
        }
    }

}