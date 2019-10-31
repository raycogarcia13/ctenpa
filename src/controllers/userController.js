import bcrypt from 'bcrypt';
const Joi = require('@hapi/joi');


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

            let schema = Joi.object().keys({
                username: Joi.string().min(6).required(),
                descripcion: Joi.string().required(),
                password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
                email : Joi.string().required().email(),
                RolId: Joi.required()
              });   
            try {
                let id = req.params.id;
                 await schema.validateAsync(req.body);

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
                if (id) {
                     await user.update(insertUser, {
                        where: {
                            id: id
                        }
                    })
                   
                    return res.status(201).res.send('Actualizado Correctamente');
                }
            } catch (error) {
                res.status(500).send('No se pudo actualizar');
            }
        },

        createUser: async (req, res) => {
                let schema = Joi.object().keys({
                    username: Joi.string().min(6).required(),
                    descripcion: Joi.string().required(),
                    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
                    email : Joi.string().required().email(),
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
                }
                 await user.create(insertUser)
               
                return res.status(201).send('Creado correctamente');

                }
                catch (err) {
                    res.send(err.details[0].message);
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
        },


        changePass: async (req, res)=>{
            
            let schema = Joi.object().keys({                
                password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
                oldpassword: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()             
              });   
            try {

                 await schema.validateAsync(req.body);
                let id = req.params.id;
                let user= await user.findByPk(id);
                if(user)
                {
                    let oldpass=req.body.oldpassword;
                    if (!bcrypt.compareSync(oldpass, user.password))
                    {
                        return res.status(400).send("password incorrecto");
                    }
    
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hashSync(req.body.password, salt);
                    let pass = { password: hashed }
                    //    actualizar en caso de q pase el id                    
                     await user.update(pass, {
                        where: {
                            id: id
                        }
                    });
                    return res.status(201).send('Se ha restablecido su contraseña');
                }
               
            } catch (err) {
                res.status(500).send(err.details[0].message);
            }
        }
    }

}