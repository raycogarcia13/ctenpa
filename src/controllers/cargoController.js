module.exports = app => {
    const cargo = app.db.models.Cargo;
    const user = app.db.models.Usuario;


    return {
        getCargos: async(req, res) => {
            let us = await cargo.findAll();
            return res.status(200).json(us);
        },
        getOneCargo: async(req, res) => {
            let one = await cargo.findOne();
            return res.status(200).json(one);
        },
        getCargoById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await cargo.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateCargo: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await cargo.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createCargo: async(req, res) => {
            const newproyec = await cargo.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteCargo: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await cargo.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

};