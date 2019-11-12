module.exports = app => {
    const cierre = app.db.models.Cierre;
    return {
        getCierre: async(req, res) => {
            let us = await cierre.findAll()
            return res.status(200).json(us);
        },
        getCierreById: async(req, res) => {
            console.log(req.params.id);
            let currentCierre = await cierre.findByPk(req.body.id)
            return res.status(200).json(currentCierre);
        },
        UpdateCierre: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcierre = await cierre.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updcierre)
            }
        },

        createCierre: async(req, res) => {
            const newcierre = await cierre.create(req.body)
            return res.status(200).json(newcierre);
        },

        deleteCierre: async(req, res) => {
            let id = req.params.id;
            const deletedCierre = await cierre.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedCierre)

        }
    }

}