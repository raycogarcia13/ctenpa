module.exports = app => {
    const subproyec = app.db.models.Sub_proyecto;
    const temp = app.db.models.Temporal;
    return {
        getSubProyectos: async (req, res) => {
            let us = await subproyec.findAll();
            return res.status(200).json(us);
        },
        getSubProyectosById: async (req, res) => {
            console.log(req.params.id);
            let currentProyec = await subproyec.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateSubProyecto: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await subproyec.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createSubProyecto: async (req, res) => {
            try {
                let currentProyec = await subproyec.findAll({
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: 1
                });
                let a = (currentProyec.length == 1) ? currentProyec[0].codigo : null;
                console.log(a);
                let contador;
                if (a === null || a === 999) {
                    contador = '000';
                } else {
                    console.log(a.substr(-3));
                    let currentvalor = a.substr(-3);
                    let tor = parseInt(currentvalor, 10);
                    tor += 1;

                    contador = ('000' + tor).slice(-3);
                }

                console.log(contador);
                let codigo = req.body.cod_servicio + req.body.num_contrato + req.body.anno_contrato + req.body.cod_ct+ contador;

                let insertProyecto = {
                    codigo: codigo,
                    sub_valor: req.body.sub_valor,
                    descripcion: req.body.descripcion,
                    terminado: req.body.terminado,
                    ProyectoId: req.body.ProyectoId,
                    AreaId: req.body.AreaId
                };
                const newproyec = await subproyec.create(insertProyecto);
                console.log(newproyec.id);
                let codId = { codigo: newproyec.id, valor: newproyec.codigo };
                await temp.create(codId);
                return res.status(200).json(newproyec);

            } catch (error) {
                res.send(error)
            }
        },

        deleteSubProyecto: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await subproyec.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};