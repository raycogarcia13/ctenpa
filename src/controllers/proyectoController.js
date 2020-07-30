module.exports = app => {
    const proyec = app.db.models.Proyectos;
    const contrato = app.db.models.Contratos;
    const estados = app.db.models.Estados;
    const temp = app.db.models.Temporal;
    return {
        countallProyectos: async(req, res) => {
            try {
                let all = await proyec.findAndCountAll();
                console.log(all.count);
                return res.status(200).json(all.count);

            } catch (error) {
                res.status(500).send(error);
            }
        },
        getProyectos: async(req, res) => {
            let us = await proyec.findAll({
                include:[{model:contrato},{model:estados}]
            });
            return res.status(200).json(us);
        },
        getProyectosById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await proyec.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateProyecto: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await proyec.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },


        createProyecto: async(req, res) => {
            try {
                // let currentProyec = await proyec.findAll({
                //     order: [
                //         ['id', 'DESC']
                //     ],
                //     limit: 1
                // });
                // var a = (currentProyec.length == 1) ? currentProyec[0].codigo : null;
                // let contador;
                // if (a === null || a === 999) {
                //     contador = '000';
                // } else {
                //     console.log(a.substr(-3));
                //     let currentvalor = a.substr(-3);
                //     let tor = parseInt(currentvalor, 10);
                //     tor += 1;
                //
                //     contador = ('000' + tor).slice(-3);
                // }



                // let codigo = req.body.num_contrato + req.body.anno_contrato + req.body.cod_ct;

                let insertProyecto = {
                    codigo: req.body.codigo,
                    nombre: req.body.nombre,
                    valor_total: req.body.valor_total,
                    descripcion: req.body.descripcion,
                    terminado: req.body.terminado,
                    ContratoId: req.body.ContratoId,
                    EstadoId: req.body.EstadoId
                };
                const newproyec = await proyec.create(insertProyecto);
                let codId = { codigo: newproyec.id, valor: newproyec.codigo };
                const newTemp = await temp.create(codId);
                return res.status(200).json(newproyec);
            } catch (error) {
                res.send(error)
            }

        },

        deleteProyecto: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await proyec.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

};
