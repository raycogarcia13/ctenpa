module.exports = app => {
    const espec = app.db.models.Especialidad;
    return {
        getEspecialidad: async(req, res) => {
            let us = await espec.findAll()
            return res.status(200).json(us);
        },
        getEspecialidadById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await espec.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateEspecialidad: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updferiado = await espec.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updferiado)
            }
        },

        createEspecialidad: async(req, res) => {
            const newferiado = await espec.create(req.body);
            return res.status(200).json(newferiado);
        },

        deleteEspecialidad: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await espec.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};