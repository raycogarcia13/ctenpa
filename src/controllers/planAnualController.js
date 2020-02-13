import sequelize from 'sequelize'
module.exports = app => {
    const planA = app.db.models.Produccion_anual;
    const empresa = app.db.models.Empresa;
    const user = app.db.models.Usuario;
    return {
        getPlan: async(req, res) => {
            try {
                let all = await planA.findAll({
                    include:{model:empresa}
                });
                return res.status(200).json(all)
            } catch (error) {
                res.status(400).send(error);
            }
        },
        getPlanYear: async(req, res) => {
            try {
                let all = await planA.findAll({
                    where: {
                        anno: req.params.year
                    },

                });
                return res.status(200).json(all)
            } catch (error) {
                res.status(400).send(error);
            }
        },
        createSalarioAnual: async(req, res) => {
            // esto es para hacer el plan real
            let year = new Date().getFullYear();
            let contador = 0;
            let all = await user.findAndCountAll({
                where: {
                    username: {
                        [sequelize.Op.notLike]: 'admin'
                    }
                }
            });
            contador = all.count;
            let div = Math.round((req.body.plan / contador) * 100) / 100;

            let insertplan = {
                    plan: req.body.plan,
                    anno: year,
                    salario_medio: div
                };
                //  falta poner el plan real
            const newcierre = await planA.create(insertplan);
            return res.status(200).json(newcierre);
            // return res.status(200).json(plan);
        },
        // getSalarioAllProy: async(req, res) => {
        //     let sal = await app.db.sequelize.query("SELECT * FROM public.f_salariocomplementario()", { type: app.db.sequelize.QueryTypes.SELECT });
        //     return res.status(200).json(sal)
        // },
    }
};