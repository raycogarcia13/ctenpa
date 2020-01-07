import bcrypt from 'bcrypt';
const Joi = require('@hapi/joi');


module.exports = app => {
    const user = app.db.models.Usuario;
    const log = app.controllers.verifyController;
    return {
        getUsers: async(req, res) => {
            try {
                let us = await user.findAll();
                return res.status(200).json(us);
            } catch (err) {
                res.status(500).send(err.details);
            }
        },
        countalluser: async(req, res) => {
            try {
                let all = await user.findAndCountAll()
                    // .then(result => {
                console.log(all.count);
                // });
                return res.status(200).json(all.count);

            } catch (error) {
                res.status(500).send(error);
            }
        },
        getUserById: async(req, res) => {
            try {
                let currentUser = await user.findByPk(req.params.id, {
                    include: [{
                        model: app.db.models.Rol,
                    }]
                });
                return res.status(200).json(currentUser);
            } catch (err) {
                res.status(500).send(err.details);
            }
        },

        UpdateUser: async(req, res) => {

            let schema = Joi.object().keys({
                username: Joi.string().min(6).required(),
                descripcion: Joi.string(),
                email: Joi.string().required().email(),
                RolId: Joi.required()
            });
            try {
                let id = req.params.id;
                await schema.validateAsync(req.body);

                let insertUser = {
                    username: req.body.username,
                    descripcion: req.body.descripcion,
                    email: req.body.email,
                    RolId: req.body.RolId
                };
                //    actualizar en caso de q pase el id              
                if (id) {
                    await user.update(insertUser, {
                        where: {
                            id: id
                        }
                    });

                    return res.status(201).res.send('Actualizado Correctamente');
                }
            } catch (err) {
                res.status(500).send(err.details);
            }
        },

        createUser: async(req, res) => {
            let schema = Joi.object().keys({
                username: Joi.string().min(5).required(),
                descripcion: Joi.string(),
                password: Joi.string().required(),
                password_confirm: Joi.string().required(),
                email: Joi.string().required().email(),
                RolId: Joi.required()
            });

            try {
                await schema.validateAsync(req.body);

                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hashSync(req.body.password, salt);
                let insertUser = {
                    username: req.body.username,
                    descripcion: req.body.descripcion,
                    password: hashed,
                    email: req.body.email,
                    RolId: req.body.RolId
                };
                await user.create(insertUser);

                return res.status(201).json(insertUser);

            } catch (err) {
                res.status(400).json(err.details);
            }



        },
        deleteUser: async(req, res) => {
            let id = req.params.id;
            try {
                const deletedTask = await user.destroy({
                    where: {
                        id: id
                    }
                });
                res.send('se elimino el usuario');
                return res.status(200).json(deletedTask)

            } catch (err) {
                res.status(400).send(err.details);

            }
        },

        changePass: async(req, res) => {

            let schema = Joi.object().keys({
                password: Joi.string().required(),
                oldpassword: Joi.string().required()
            });
            try {

                await schema.validateAsync(req.body);
                let id = req.params.id;
                let usuario = await user.findByPk(id);
                if (usuario) {
                    let oldpass = req.body.oldpassword;
                    if (!bcrypt.compareSync(oldpass, usuario.password)) {
                        return res.status(400).send("password incorrecto");
                    }

                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hashSync(req.body.password, salt);
                    let pass = { password: hashed };
                    //    actualizar en caso de q pase el id
                    await user.update(pass, {
                        where: {
                            id: id
                        }
                    });
                    return res.status(201).send('Se ha restablecido su contraseña');
                }

            } catch (err) {
                res.status(500).send(err.details);
            }
        },

        changePassAdmin: async(req, res) => {

            let schema = Joi.object().keys({
                password: Joi.string().required()
            });
            try {

                await schema.validateAsync(req.body);
                let id = req.params.id;
                let usuario = await user.findByPk(id);
                if (usuario) {

                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hashSync(req.body.password, salt);
                    let pass = { password: hashed };
                    //    actualizar en caso de q pase el id
                    await user.update(pass, {
                        where: {
                            id: id
                        }
                    });
                    return res.status(201).send('Se ha restablecido su contraseña');
                }
            } catch (err) {
                res.status(500).json(err.details);
            }
        }
    }

};