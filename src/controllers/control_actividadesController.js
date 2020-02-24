module.exports = app => {
    const ctrl = app.db.models.Control_actividades;

    return {
        getControlAct: async(req, res) => {
            let us = await ctrl.findAll();
            return res.status(200).json(us);
        },
        getOne: async(req, res) => {
            let one = await ctrl.findOne();
            return res.status(200).json(one);
        },
        getControlActById: async(req, res) => {
            let currentProyec = await ctrl.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateControlAct: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcontrato = await ctrl.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updcontrato)
            }
        },


        createControlAct: async(req, res) => {

            let bodyAct = req.body;
            var vale = Object.values(bodyAct.tiempos);
            let tmp = vale.length;
            // return console.log(vale)
            // esto ya inserta pero no actualiza y solo lo hace en el primero q encuentra
            for (let i = 0; i < tmp; i++) {
                if (vale[i] !== 0) {
                    let ctrlA = {
                        dia: i + 1,
                        mes: bodyAct.mes,
                        anno: bodyAct.anno,
                        tiempo: bodyAct.tiempos[i],
                        ActividadeId: bodyAct.ActividadeId,
                        TrabajadorId: bodyAct.TrabajadorId
                    };
                    // console.log(ctrlA.dia);
                    let valores = await ctrl.findAll({
                        attributes: ['id', 'tiempo']
                    }, {
                        where: {
                            dia: ctrlA.dia,
                            mes: ctrlA.mes,
                            anno: ctrlA.anno,
                            ActividadeId: ctrlA.ActividadeId,
                            TrabajadorId: ctrlA.TrabajadorId
                        }
                    });
                    // console.log(valores[0].id);
                    // if (!Object.entries(valores).length===0 && valores.tiempo!==bodyAct.tiempos[i]){
                    if (valores[0].id && valores[0].tiempo !== bodyAct.tiempos[i]) {
                        let upd = await ctrl.update(ctrlA, {
                            where: {
                                id: valores[0].id
                            }
                        });
                        return res.json(upd);
                    } else {
                        let inst = await ctrl.create(ctrlA);
                        return res.json(inst);
                    }
                }

            }
            // return res.json(valores);

            // }
            // try {
            //
            // } catch (error) {
            //     res.send(error)
            // }

        },

        deleteControlAct: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await ctrl.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};