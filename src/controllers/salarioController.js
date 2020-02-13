module.exports = app => {
    const salario = app.db.models.Salario;
    const proyec = app.db.models.Proyectista;
    return {
        getSalario: async(req, res) => {
            try {
                let all = await salario.findAll({
                    include: { model: proyec }
                });
                return res.status(200).json(all)
            } catch (error) {
                res.status(400).send(error);
            }
        },
        getSalarioAllProy: async(req, res) => {
            let sal = await app.db.sequelize.query("SELECT * FROM public.f_salariocomplementario()", { type: app.db.sequelize.QueryTypes.SELECT });
            return res.status(200).json(sal)
        },
    }
};