module.exports = app => {
    const escala = app.db.models.Escalas;
    const cargo = app.db.models.Cargo;

    return {
        getEscala: async(req, res) => {
            let us = await escala.findAll({
                include:{
                    model:cargo
                }
            });
            return res.status(200).json(us);
        },
        getOneEscala: async(req, res) => {
            let one = await escala.findOne();
            return res.status(200).json(one);
        },
        getEscalaById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await escala.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateEscala: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await escala.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createEscala: async(req, res) => {
            const newproyec = await escala.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteEscala: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await escala.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

};