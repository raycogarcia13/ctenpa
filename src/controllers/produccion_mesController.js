module.exports = app => {
    const prod = app.db.models.Produccion_mes;
    const anual = app.db.models.Plan_anual;
    const area = app.db.models.Area;
    return {
        getproduccion: async(req, res) => {
            let us = await prod.findAll({
                include:[{model:area}]
            });
            return res.status(200).json(us);
        },
        getproduccionId: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await prod.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        Updateproduccion: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updferiado = await prod.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updferiado)
            }
        },

        createproduccion: async(req, res) => {
            try {
                let currentProyec = await anual.findAll({
                    where: { anno: req.body.anno }

                });
                let plan_real =0;
                console.log(currentProyec[0].plan_real);
                let prodmes = {
                    mes:req.body.mes,
                    anno:req.body.anno,
                    plan:req.body.plan,
                    plan_real:plan_real,
                    salario_mensual:req.body.salario_mensual,
                    horas_mensual:req.body.horas_mensual,
                    AreaId:req.body.AreaId
                };
                const newprod = await prod.create(prodmes);

                // let suma = 0;
                // suma = parseInt(newprod.plan_real) + parseInt(currentProyec[0].plan_real);
                //
                // let plan = { plan_real: suma };
                // await anual.update(plan, {
                //     where: {
                //         anno: req.body.anno
                //     }
                // });
                return res.status(200).json(newprod);

            } catch (error) {
                res.send(error)
            }
        },

        deleteproduccion: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await prod.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};