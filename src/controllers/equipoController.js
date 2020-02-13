import sequelize from "sequelize";

module.exports = app => {
    const equipo = app.db.models.Equipo;
    const trabajador = app.db.models.Trabajador;
    const subp = app.db.models.Sub_proyecto;
    const proyec = app.db.models.Proyectos;
    const user = app.db.models.Usuario;
    return {
        getEquipos: async (req, res) => {
            let us = await equipo.findAll();
            return res.status(200).json(us);
        },
        getCT: async(req,res)=>{
            let u = await trabajador.findAll({
                include:[{model:user}],
                where:[{
                    UsuarioId: req.params.id
                }]
            });
            res.json(u);
            // let us = await equipo.findAll({
            //     where:[{
            //         TrabajadorId:req.params.id,
            //         [sequelize.Op.and]:[{
            //
            //         }],
            //     }],
            //
            //     include: [
            //         { model:trabajador},
            //         {model:subp, include:[{model:proyec}]}
            //     ]
            // });
            // return res.status(200).json(us);
        },
        getEquipoById: async (req, res) => {
            console.log(req.params.id);
            let currentProyec = await equipo.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateEquipo: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await equipo.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createEquipo: async (req, res) => {
            const newproyec = await equipo.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteEquipo: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await equipo.destroy({
                where: {
                    id: id
                }
            });

            return res.status(200).json(deletedTask)

        }
    }

};