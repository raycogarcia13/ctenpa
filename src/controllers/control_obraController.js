module.exports = app => {
    const ctrl = app.db.models.Control_obra;
    const ctrlAct = app.db.models.Control_actividades;
    const cproy = app.db.models.Cierre_proyectista;

    return {
        getControlObra: async(req, res) => {
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

        validarTime: async(req, res) => {
            let bodyAct = req.body.objVal;
            // let bodyAct = req.body;
            let suma=0;
            let itAct=0;
            let itObra=0;
            let actividad=0;
            let obras=0;
            try {
                let valoresAct = await ctrlAct.findAll({
                    where:{
                        dia:bodyAct.dia,
                        mes:bodyAct.mes,
                        anno:bodyAct.anno,
                        TrabajadorId:bodyAct.TrabajadorId
                    }
                });

                let valoresObra= await ctrl.findAll({
                    where: {
                        dia:bodyAct.dia,
                        mes:bodyAct.mes,
                        anno:bodyAct.anno,
                        TrabajadorId:bodyAct.TrabajadorId
                    }
                });
                // return res.json(valoresObra);
                // recorrer el tiempo de las actividades
                for (let a = 0; a <valoresAct.length ; a++) {
                    itAct +=valoresAct[a]['tiempo']
                }

                // recorrer el tiempo de las obras
                for (let i = 0; i <valoresObra.length ; i++) {
                    itObra +=valoresObra[i]['tiempo']
                }
                // return res.json(itObra);
                if (valoresAct.length==0) { actividad=0; }else {
                    actividad = itAct;
                }

                if (valoresObra.length==0) { obras=0; }else { obras = itObra; }
                 // revisar q cuando sea un actualizar no sume los dos valores
                 //  suma= actividad + obras + bodyAct.tiempos;
                  suma= actividad + obras;

                res.json({
                    valoresObra,
                    valoresAct,
                    vali:true,
                    suma
                });
            } catch (e) {
                res.send(e)
            }

        },
        createControlObra: async(req, res) => {
            let bodyAct = req.body;
            var vale = Object.values(bodyAct.tiempos);
            let tmp = vale.length;
            try {
                var valores= await ctrl.findAll({
                    where: {
                        mes:req.body.mes,
                        anno:req.body.anno,
                        TrabajadorId:req.body.TrabajadorId,
                        SubProyectoId:req.body.SubProyectoId
                    }
                });
                // let allact = await cproy.findAll({
                //     where: {
                //         mes: bodyAct.mes,
                //         anno: bodyAct.anno,
                //     },
                //     raw: true
                // });
                // let valores = await ctrl.findAll();
            // return res.json(val);
                let exist=false;
                for (let d = 0; d < tmp; d++) {
                    let ctrlA = {
                        dia:d+1,
                        mes: bodyAct.mes,
                        anno: bodyAct.anno,
                        tiempo: vale[d],
                        TrabajadorId:req.body.TrabajadorId,
                        SubProyectoId:req.body.SubProyectoId
                    };
                    exist=false;
                    for (let v = 0; v <valores.length ; v++) {
                        if (valores[v].dia === ctrlA.dia)
                        {
                            if(valores[v].tiempo !== ctrlA.tiempo)
                            {
                             // este es el update de obras
                                await ctrl.update(ctrlA,{
                                    where:{
                                        id:valores[v].id
                                    }
                                });
                                // este es el update cierre proyectista
                                // let u =  await cproy.findOne({
                                //     where:{
                                //         mes:ctrlA.mes,
                                //         anno:ctrlA.anno,
                                //         TrabajadorId:ctrlA.TrabajadorId,
                                //         SubProyectoId:ctrlA.SubProyectoId
                                //     },
                                //     attributes:['id','acumulado_obras'],
                                //     raw:true
                                // });
                                //
                                // console.log(valores[v].tiempo);
                                // console.log('new',ctrlA.tiempo);
                                // let difminus =0;
                                // let difplus =0;
                                // if (valores[v].tiempo > ctrlA.tiempo){
                                //     difminus = valores[v].tiempo - ctrlA.tiempo;
                                //     let acumplus= u['acumulado_obras'] - difminus;
                                //         await cproy.update({ acumulado_obras:Math.abs(acumplus) },{
                                //             where:{
                                //                 id:u['id']
                                //             }
                                //         });
                                //         console.log('-',acumplus);
                                // }
                                // if (valores[v].tiempo < ctrlA.tiempo){
                                //     difplus = ctrlA.tiempo - valores[v].tiempo ;
                                //     let acuminus= u['acumulado_obras'] + difplus;
                                //         await cproy.update({ acumulado_obras:Math.abs(acuminus) },{
                                //             where:{
                                //                 id:u['id']
                                //             }
                                //         });
                                //         console.log('+',acuminus);
                                // }
                            }
                            exist=true;
                            break;
                        }
                    }
                    if(!exist)
                    {
                        if(ctrlA.tiempo !== 0){
                            await ctrl.create(ctrlA);

                            // if (allact.length===0){
                            //             await cproy.create({
                            //                 mes: ctrlA.mes,
                            //                 anno: ctrlA.anno,
                            //                 acumulado_obras: ctrlA.tiempo,
                            //                 SubProyectoId: ctrlA.SubProyectoId,
                            //                 TrabajadorId: ctrlA.TrabajadorId
                            //             });
                            //         }
                            // if (allact!==0){
                            //     let u =  await cproy.findOne({
                            //         where:{
                            //             mes:ctrlA.mes,
                            //             anno:ctrlA.anno,
                            //             TrabajadorId:ctrlA.TrabajadorId,
                            //             SubProyectoId:ctrlA.SubProyectoId
                            //         },
                            //         attributes:['id','acumulado_obras'],
                            //         raw:true
                            //     });
                            //     let acumplus=0;
                            //     if(u===null){
                            //         await cproy.create({
                            //             mes: ctrlA.mes,
                            //             anno: ctrlA.anno,
                            //             acumulado_obras: ctrlA.tiempo,
                            //             ActividadeId: ctrlA.ActividadeId,
                            //             TrabajadorId: ctrlA.TrabajadorId
                            //         });
                            //     }else
                            //     {
                            //         acumplus = u['acumulado_obras'] + ctrlA.tiempo;
                            //         await cproy.update({ acumulado_obras:Math.abs(acumplus) },{
                            //             where:{
                            //                 id:u['id']
                            //             }
                            //         });
                            //     }
                            // }

                        }

                    }
                }

            } catch (error) {
                res.send(error);
                console.log(error);
            }


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
