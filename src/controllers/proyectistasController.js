module.exports = app => {
    const proyec = app.db.models.Proyectista;
    
    return {
        getProyectistas: async (req, res) => {
            let us = await proyec.findAll()
            return res.status(200).json(us);
        },
        getProyectistaById: async (req, res) => {
            console.log(req.params.id);
            let currentProyec = await proyec.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateProyectista: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await proyec.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updproyect)
            }
        },

        createProyectista: async (req, res) => {
            const newproyec = await proyec.create(req.body)
            return res.status(200).json(newproyec);
        },

        deleteProyectista: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await proyec.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}