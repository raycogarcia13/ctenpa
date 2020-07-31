module.exports = app => {
    const asignacion = app.db.models.Asignacion;
    const equipo = app.db.models.Equipo;
    const subp = app.db.models.Sub_proyecto;
    const proyectos = app.db.models.Proyectos;
    return {
        getAsignacion: async(req, res) => {
            let us = await asignacion.findAll({
                include: [{ model: equipo, attributes: ['nombre'] }, { model: subp, include: [{ model: proyectos }] }],
                raw: true
            });
            let todos = [];
            for (var i = 0; i < us.length; i++) {
                var obj = {
                    "id": us[i]['id'],
                    "equipo": us[i]['Equipo.nombre'],
                    "codigo": us[i]['Sub_proyecto.codigo'],
                    "proyecto": us[i]['Sub_proyecto.Proyecto.nombre'],
                };
                todos.push(obj);
            }
            return res.status(200).json(todos);
        },
        getOne: async(req, res) => {
            let one = await asignacion.findOne();
            return res.status(200).json(one);
        },
        getAsignacionById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await asignacion.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateAsignacion: async(req, res) => {
            let id = req.params.id;
            try {
                if (id) {
                    const updproyect = await asignacion.update(req.body, {
                        where: {
                            id: id
                        }
                    });
                    return res.status(200).json(updproyect)
                }
            } catch (e) {
                res.json({
                    errores: "SI",
                    msg: e.detail,
                    nombre: 'Ya esa asignación existe por favor corríjala'
                })
            }

        },

        createAsignacion: async(req, res) => {
            // let insert = {
            //     "EquipoId":req.body.EquipoId,
            //     "SubProyectoId":req.body.SubProyectoId
            // };
            // const newproyec = await asignacion.create(insert);
            try {
                const newproyec = await asignacion.create(req.body);
                return res.status(200).json(newproyec);
            } catch (e) {
                console.log(e);
                res.json({
                    errores: "SI",
                    msg: e.detail,
                    nombre: 'Ya esa asignación existe por favor corríjala'
                })
            }

        },

        deleteAsignacion: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await asignacion.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};