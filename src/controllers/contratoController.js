module.exports = app => {
    const contrato = app.db.models.Contrato;
    const temp = app.db.models.Temporal;
    return {
        getContratos: async(req, res) => {
            let us = await contrato.findAll()
            return res.status(200).json(us);
        },
        getContratosById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await contrato.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateContratos: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcontrato = await contrato.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updcontrato)
            }
        },


        createContrato: async(req, res) => {
            try {

                const newproyec = await contrato.create(req.body)
                return res.status(200).json(newproyec);

            } catch (error) {
                res.send(error)
            }

        },

        deleteContrato: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await contrato.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}