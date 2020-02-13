module.exports = app => {
    const rol = app.db.models.Denominaciones;
    return {
        getDenominaciones: async (req, res) => {
            let us = await rol.findAll();
            return res.status(200).json(us);
        },
        getDenominacionesById: async (req, res) => {
            let currentRol = await rol.findByPk(req.body.id);
            return res.status(200).json(currentRol);
        },
        UpdateDenominaciones: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updRol = await rol.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updRol)
            }
        },

        createDenominaciones: async (req, res) => {
            const newRol = await rol.create(req.body);
            return res.status(200).json(newRol);
        },

        deleteDenominaciones: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await rol.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

};