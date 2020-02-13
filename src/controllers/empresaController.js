module.exports = app => {
    const empresa = app.db.models.Empresa;

    return {
        getEmpresa: async(req, res) => {
            let us = await empresa.findAll();
            return res.status(200).json(us);
        },
        getEmpresaById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await empresa.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateEmpresa: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await empresa.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createEmpresa: async(req, res) => {
            const newproyec = await empresa.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteEmpresa: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await empresa.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedTask)

        }
    }

};