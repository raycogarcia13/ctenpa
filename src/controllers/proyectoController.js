import Sequelize from 'sequelize'
module.exports = app => {
    const proyec = app.db.models.Proyecto;
    const temp = app.db.models.Temporal;
    return {
        getProyectos: async(req, res) => {
            let us = await proyec.findAll()
            return res.status(200).json(us);
        },
        getProyectosById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await proyec.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateProyecto: async(req, res) => {
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


        createProyecto: async(req, res) => {
            try {
                let currentProyec = await temp.findAll({
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: 1
                })
                var a = (currentProyec.length == 1) ? currentProyec[0].valor : null;
                let contador;
                if (a == null || a == 999) {
                    contador = '000';
                } else {
                    console.log(a.substr(-3))
                    let trim = a.substr(-3)
                    var tor = parseInt(trim, 10)
                    tor += 1;
                    contador = ("000" + tor).slice(-3);
                }


                console.log(contador)
                let codigo = req.body.cod_servicio + req.body.num_contrato + req.body.anno_contrato + contador

                let insertProyecto = {
                    codigo: codigo,
                    nombre: req.body.nombre,
                    valor_total: req.body.valor_total,
                    descripcion: req.body.descripcion,
                    terminado: req.body.terminado,
                    ContratoId: req.body.contratoId
                }
                const newproyec = await proyec.create(insertProyecto)
                console.log(newproyec.id)
                let codId = { codigo: newproyec.id, valor: newproyec.codigo }
                const newTemp = await temp.create(codId)
                return res.status(200).json(newproyec);
                // return res.status(200).json(insertProyecto)
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
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}