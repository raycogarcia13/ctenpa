module.exports = app => {
    const integrantes = app.db.models.Integrantes;
    const asignacion = app.db.models.Asignacion;
    const trab = app.db.models.Trabajador;
    const equipo = app.db.models.Equipo;
    return {
        getIntegrantes: async(req, res) => {
            // let us = await integrantes.findAll({
            // include:[{model:asignacion,include:[{model:equipo, attributes:['nombre']}]},{model:trab,attributes:['nombre','apellidos']}],
            // raw:true
            // });
            let todos = [];
            try {
                let getekipo = 'SELECT  sub_proyecto.codigo,proyectos.nombre AS proyectos,equipo.nombre FROM sub_proyecto INNER JOIN proyectos ON sub_proyecto."ProyectoId" = proyectos."id" INNER JOIN  asignacion ON sub_proyecto."id" = asignacion."SubProyectoId" INNER JOIN equipo ON asignacion."EquipoId" = equipo."id" GROUP BY equipo.nombre, proyectos.nombre,sub_proyecto.codigo'
                let equipos = await app.db.sequelize.query(getekipo, { type: app.db.sequelize.QueryTypes.SELECT });
                for (var i = 0; i < equipos.length; i++) {
                    let qry = `SELECT trabajador.nombre || trabajador.apellidos AS integrante,integrantes."id",proyectos.nombre,sub_proyecto.codigo,trabajador."id" AS trabajador,asignacion."id" AS asignacion FROM integrantes
                        INNER JOIN trabajador ON integrantes."TrabajadorId" = trabajador."id" INNER JOIN asignacion ON integrantes."AsignacionId" = asignacion."id"
                        INNER JOIN sub_proyecto ON asignacion."SubProyectoId" = sub_proyecto."id" INNER JOIN proyectos ON sub_proyecto."ProyectoId" = proyectos."id"
                        INNER JOIN equipo ON asignacion."EquipoId" = equipo."id" WHERE sub_proyecto.codigo = '${equipos[i].codigo}' GROUP BY proyectos.nombre, sub_proyecto.codigo, 
                        trabajador.nombre, trabajador.apellidos,integrantes."id",trabajador."id",asignacion."id"`
                    var obj = {
                        "proyectos": equipos[i].proyectos,
                        "subproyecto": equipos[i].codigo,
                        "equipo": equipos[i].nombre,
                        "integrantes": await app.db.sequelize.query(qry, { type: app.db.sequelize.QueryTypes.SELECT }),
                    };
                    todos.push(obj);
                }

            } catch (e) {
                console.log(e)
            }
            return res.status(200).json(todos);
        },
        getIntegrantesById: async(req, res) => {
            let currentRol = await integrantes.findByPk(req.body.id);
            return res.status(200).json(currentRol);
        },
        UpdateIntegrantes: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updRol = await integrantes.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updRol)
            }
        },

        createIntegrantes: async(req, res) => {
            const newRol = await integrantes.create(req.body);
            return res.status(200).json(newRol);
        },

        deleteIntegrantes: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await integrantes.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};