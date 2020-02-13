module.exports = app => {
    const estados = app.db.models.Estados;
    return {
        getEstados: async (req, res) => {
            let us = await estados.findAll();
            return res.status(200).json(us);
        },
        getEstadosById: async (req, res) => {
            let currentRol = await estados.findByPk(req.body.id);
            return res.status(200).json(currentRol);
        },
        UpdateEstados: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updRol = await estados.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updRol)
            }
        },

        createEstados: async (req, res) => {
            const newRol = await estados.create(req.body);
            return res.status(200).json(newRol);
        },

        deleteEstados: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await estados.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};