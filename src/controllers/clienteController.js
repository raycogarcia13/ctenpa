module.exports = app => {
    const cliente = app.db.models.Cliente;
    const temp = app.db.models.Temporal;
    return {
        getClientes: async(req, res) => {
            let us = await cliente.findAll()
            return res.status(200).json(us);
        },
        getClienteById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await cliente.findByPk(req.body.id)
            return res.status(200).json(currentProyec);
        },
        UpdateCliente: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcontrato = await cliente.update(req.body, {
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(updcontrato)
            }
        },


        createCliente: async(req, res) => {
            try {

                const newproyec = await cliente.create(req.body)
                return res.status(200).json(newproyec);

            } catch (error) {
                res.send(error)
            }

        },

        deleteCliente: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await cliente.destroy({
                where: {
                    id: id
                }
            })
            res.send('se elimino');
            return res.status(200).json(deletedTask)

        }
    }

}