import sequelize from 'sequelize';

const Op = require('sequelize').Op;
module.exports = app => {
    const ctrl = app.db.models.Control_actividades;
    const user = app.db.models.Trabajador;
    const cAct = app.db.models.Cierre_actividades;

    return {
        getControlAct: async (req, res) => {
            let us = await ctrl.findAll();
            return res.status(200).json(us);
        },

        getOne: async (req, res) => {
            let one = await ctrl.findOne();
            return res.status(200).json(one);
        },
        getControlActById: async (req, res) => {
            let currentProyec = await ctrl.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateControlAct: async (req, res) => {
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
        createControlAct: async (req, res) => {
            let bodyAct = req.body;
            var vale = Object.values(bodyAct.tiempos);
            let tmp = vale.length;
            let valores = await ctrl.findAll({
                where: {
                    mes: bodyAct.mes,
                    anno: bodyAct.anno,
                    ActividadeId: bodyAct.ActividadeId,
                    TrabajadorId: bodyAct.TrabajadorId
                }
            });
            // let allact = await cAct.findAll({
            //     where: {
            //         mes: bodyAct.mes,
            //         anno: bodyAct.anno,
            //     },
            //     raw: true
            // });

            let exist = false;
            for (let d = 0; d < tmp; d++) {
                let ctrlA = {
                    dia: d + 1,
                    mes: bodyAct.mes,
                    anno: bodyAct.anno,
                    tiempo: vale[d],
                    ActividadeId: bodyAct.ActividadeId,
                    TrabajadorId: bodyAct.TrabajadorId
                };
                exist = false;
                for (let v = 0; v < valores.length; v++) {
                    if (valores[v].dia === ctrlA.dia) {

                        if (valores[v].tiempo !== ctrlA.tiempo) {
                            await ctrl.update(ctrlA, {
                                where: {
                                    id: valores[v].id
                                }
                            });

                            // este es el update cierre proyectista
                            // let u = await cAct.findOne({
                            //     where: {
                            //         mes: ctrlA.mes,
                            //         anno: ctrlA.anno,
                            //         ActividadeId:ctrlA.ActividadeId,
                            //         TrabajadorId: ctrlA.TrabajadorId
                            //     },
                            //     attributes: ['id', 'acumulado_actividades'],
                            //     raw: true
                            // });
                            // let difminus = 0;
                            // let difplus = 0;
                            // if (valores[v].tiempo > ctrlA.tiempo) {
                            //     difminus = valores[v].tiempo - ctrlA.tiempo;
                            //     let acumplus = u['acumulado_actividades'] - Math.abs(difminus);
                            //     await cAct.update({acumulado_actividades: Math.abs(acumplus)}, {
                            //         where: {
                            //             id: u['id']
                            //         }
                            //     });
                            //     console.log('-', acumplus);
                            // }
                            // if (valores[v].tiempo < ctrlA.tiempo) {
                            //     difplus = ctrlA.tiempo - valores[v].tiempo;
                            //     let acuminus = u['acumulado_actividades'] + Math.abs(difplus);
                            //     await cAct.update({acumulado_actividades: Math.abs(acuminus)}, {
                            //         where: {
                            //             id: u['id']
                            //         }
                            //     });
                            //     console.log('+', acuminus);
                            // }

                        }
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    if (ctrlA.tiempo !== 0) {
                        await ctrl.create(ctrlA);
                        // if (allact.length===0){
                        //     await cAct.create({
                        //         mes: ctrlA.mes,
                        //         anno: ctrlA.anno,
                        //         acumulado_actividades: ctrlA.tiempo,
                        //         ActividadeId: ctrlA.ActividadeId,
                        //         TrabajadorId: ctrlA.TrabajadorId
                        //     });
                        // }

                        // if (allact!==0){
                        //     let u =  await cAct.findOne({
                        //         where:{
                        //             mes:ctrlA.mes,
                        //             anno:ctrlA.anno,
                        //             ActividadeId:ctrlA.ActividadeId,
                        //             TrabajadorId:ctrlA.TrabajadorId
                        //         },
                        //         attributes:['id','acumulado_actividades'],
                        //         raw:true
                        //     });
                            // return console.log(u);
                        //     let acumplus=0;
                        //     if(u===null){
                        //         await cAct.create({
                        //             mes: ctrlA.mes,
                        //             anno: ctrlA.anno,
                        //             acumulado_actividades: ctrlA.tiempo,
                        //             ActividadeId: ctrlA.ActividadeId,
                        //             TrabajadorId: ctrlA.TrabajadorId
                        //         });
                        //     }else
                        //         {
                        //             acumplus = u['acumulado_actividades'] + ctrlA.tiempo;
                        //             await cAct.update({ acumulado_actividades:Math.abs(acumplus) },{
                        //                 where:{
                        //                     id:u['id']
                        //                 }
                        //             });
                        //         }
                        // }
                    }
                }
            }

        },

        deleteControlAct: async (req, res) => {
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
