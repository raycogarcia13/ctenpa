module.exports = app => {
    const area = app.db.models.Area;
    return {
        getAreas: async (req, res) => {
            let us = await area.findAll();
            return res.status(200).json(us);
        },
        getAreaById: async (req, res) => {
            console.log(req.params.id);
            let currentProyec = await area.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateArea: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await area.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createArea: async (req, res) => {
            const newproyec = await area.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteArea: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await area.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

};