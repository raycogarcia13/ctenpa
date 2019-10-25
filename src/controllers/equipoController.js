module.exports = app => {
    const equipo = app.db.models.Equipo;
    return {
        getEquipos: async (req, res) => {
            let us = await equipo.findAll()
            return res.status(200).json(us);
        },
        getEquipoById: async (req, res) => {
            console.log(req.params.id);
            let currentProyec = await equipo.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateEquipo: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await equipo.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updproyect)
            }
        },

        createEquipo: async (req, res) => {
            const newproyec = await proyec.create(req.body)
            return res.status(200).json(newproyec);
        },

        deleteEquipo: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await equipo.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}