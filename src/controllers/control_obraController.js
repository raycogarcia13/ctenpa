module.exports = app => {
    const ctrl = app.db.models.Control_obra;

    return {
        getControlAct: async(req, res) => {
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


        createControlAct: async(req, res) => {
            try {

                const newproyec = await ctrl.create(req.body);
                return res.status(200).json(newproyec);

            } catch (error) {
                res.send(error)
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