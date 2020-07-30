module.exports = app => {
    const cierreProyectista = app.db.models.Cierre_proyectista;


    return {
        getCierreProyectista: async(req, res) => {
            let us = await cierreProyectista.findAll();
            return res.status(200).json(us);
        },

        getCierrePById: async(req, res) => {
            let currentCierre = await cierreProyectista.findByPk(req.body.id);
            return res.status(200).json(currentCierre);
        },

        UpdateCierrePro: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcierre = await cierreProyectista.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updcierre)
            }
        },

        createCierreP: async(req, res) => {
            try {
                const newproyec = await cierreProyectista.create(req.body);
                return res.status(200).json(newproyec);
            }catch (e) {
                console.log(e)
            }
        },

        deleteCierreP: async(req, res) => {
            let id = req.params.id;
            const deletedCierre = await cierreProyectista.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedCierre)

        }
    }

};
