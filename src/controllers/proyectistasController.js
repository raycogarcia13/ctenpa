import bcrypt from 'bcrypt';
const Joi = require('@hapi/joi');
module.exports = app => {
    const proyec = app.db.models.Proyectista;
    const user = app.db.models.Usuario;
    const area = app.db.models.Area;
    const especialidad = app.db.models.Especialidad;

    return {
        getProyectistasXarea: async(req, res) => {
            let us = await proyec.findAll({
                where: [{
                    AreaId: req.params.id
                }],
                include: [{ model: area }, { model: especialidad }]
            })
            return res.status(200).json(us);
        },
        getProyectistas: async(req, res) => {
            let us = await proyec.findAll({
                include: [{ model: especialidad },
                    { model: area }
                ]
            })
            return res.status(200).json(us);
        },
        getProyectistaById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await proyec.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateProyectista: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await proyec.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updproyect)
            }
        },

        createProyectista: async(req, res) => {
            let schema = Joi.object().keys({
                username: Joi.string().min(6).required(),
                descripcion: Joi.string().required(),
                password: Joi.string().min(6).required(),
                password_confirm: Joi.string().required(),
                email: Joi.string().required().email(),
                RolId: Joi.required(),
                nombre: Joi.string().required(),
                apellidos: Joi.string().required(),
                escala_salarial: Joi.number().required(),
                perfec_empresarial: Joi.number().required(),
                coeficiente: Joi.number().required(),
                cargo: Joi.string().required(),
                salario_hora: Joi.number().required(),
                areaId: Joi.required(),
                especialidadId: Joi.required()
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
                let currentProyec = await user.findOne({
                    where: {
                        username: req.body.username
                    }
                });
                if (currentProyec) { return res.send("El usuario ya existe por favor eliga otro") }
                let getId = await user.create(insertUser);
                let userId = getId;
                let inserProyect = {
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    perfec_empresarial: req.body.perfec_empresarial,
                    coeficiente: req.body.coeficiente,
                    escala_salarial: req.body.escala_salarial,
                    cargo: req.body.cargo,
                    salario_hora: req.body.salario_hora,
                    UsuarioId: userId.id,
                    AreaId: req.body.areaId,
                    EspecialidadId: req.body.especialidadId
                }

                await proyec.create(inserProyect);
                return res.status(201).send("Insertado Correctamente");

            } catch (err) {
                res.send(err.details[0].message);
            }
        },

        deleteProyectista: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await proyec.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)
        }
    }

}