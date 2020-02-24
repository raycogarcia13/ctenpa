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


        createControlObra: async(req, res) => {
            try {
                var ida= await ctrl.findOne({
                    where: {
                        mes:req.body.mes,
                        anno:req.body.anno,
                        EquipoId:req.body.EquipoId

                    }
                });
                // return res.json(ida.id);
                if (Object.entries(ida).length===0){
                    let ctrlAct;
                    if(req.body.tiempo!=0)
                        ctrlAct= await ctrl.create(req.body);
                    return  res.status(200).json(ctrlAct)

                }else
                {
                    let id =ida.id;
                    const updcontrato = await ctrl.update(req.body, {
                        where: {
                            id: id
                        }
                    });
                    return res.status(200).json(updcontrato)
                }
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