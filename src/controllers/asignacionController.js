module.exports = app => {
    const actividad = app.db.models.Actividades;
    return {
        getActividad: async(req, res) => {
            let us = await actividad.findAll();
            return res.status(200).json(us);
        },
        getOne: async(req, res) => {
            let one = await actividad.findOne();
            return res.status(200).json(one);
        },
        getActividadById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await actividad.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateActividad: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await actividad.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createActividad: async(req, res) => {
            const newproyec = await actividad.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteActividad: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await actividad.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};