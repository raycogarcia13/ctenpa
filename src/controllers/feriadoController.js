module.exports = app => {
    const feriado = app.db.models.Feriados;
    return {
        getferiados: async (req, res) => {
            let us = await feriado.findAll()
            return res.status(200).json(us);
        },
        getferiadosById: async (req, res) => {
            console.log(req.params.id);
            let currentProyec = await feriado.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        Updateferiados: async (req, res) => {
            let id = req.params.id;
            if (id) {
                const updferiado = await feriado.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updferiado)
            }
        },

        createferiado: async (req, res) => {
            const newferiado = await feriado.create(req.body)
            return res.status(200).json(newferiado);
        },

        deleteferiado: async (req, res) => {
            let id = req.params.id;
            const deletedTask = await feriado.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}