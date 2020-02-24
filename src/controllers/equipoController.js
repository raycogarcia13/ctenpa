function cantDaysMonth(mes, anno) {
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (anno % 100 == 0)
                if (anno % 400 == 0)
                    return 29;
                else
                    return 28;
            else if (anno % 4 == 0)
                return 29;
            else
                return 28;
    }
    return 0;
}

module.exports = app => {
    const equipo = app.db.models.Equipo;
    const trabajador = app.db.models.Trabajador;
    const subp = app.db.models.Sub_proyecto;
    const proyec = app.db.models.Proyectos;
    const user = app.db.models.Usuario;
    const act = app.db.models.Actividades;
    const ctrlAct = app.db.models.Control_actividades;
    const ctrlObra = app.db.models.Control_obra;
    return {

        getTrabXid: async(req, res) => {
            let usu = await trabajador.findOne({
                include: [{ model: user }],
                where: [{
                    UsuarioId: req.params.id
                }]
            });
            return res.status(200).json(usu);
        },
        getEquipXtrab: async(req, res) => {
            let usu = await trabajador.findOne({
                include: [{ model: user }],
                where: [{
                    UsuarioId: req.params.id
                }]
            });
            let e = await equipo.findOne({
                include: [{ model: trabajador }],
                where: [{
                    TrabajadorId: usu.id
                }]
            });
            return res.status(200).json(e);
        },
        getEquipos: async(req, res) => {
            let us = await equipo.findAll();
            return res.status(200).json(us);
        },

        getCT: async(req, res) => {
            let a = await act.findAll();
            // return res.json(a);
            let u = await trabajador.findOne({
                include: [{ model: user }],
                where: [{
                    UsuarioId: req.params.id
                }]
            });
            // return res.json(u.id);
            let us = await equipo.findAll({
                where: [{
                    TrabajadorId: u.id,
                }],
                include: [
                    { model: subp, include: [{ model: proyec }] }
                ]
            });
            // return res.json(us);
            let todos = [];
            var dia = new Date().getDay();
            var mes = new Date().getMonth();
            var anno = new Date().getFullYear();
            var tmpO = {};
            var tmpObraO = {};
            // obtener las actividades e insertar los datos en control de actividades
            for (let i = 0; i < a.length; i++) {
                let tmp = {
                    id: a[i].id,
                    nombre: a[i].actividad,
                    mes: mes + 1,
                    anno: anno,
                    typ: 'actividades'
                };
                // return res.json(tmp);
                let registerTmp = await ctrlAct.findAll();
                // let registerTmp = await ctrlAct.findAll({
                // where: {
                //     id: a[i].id,
                //     TrabajadorId: u.id

                // },
                // order: [
                //     ['dia', 'ASC']
                // ],
                // });
                console.log(registerTmp[i]);
                // let tmpReg = [];
                // for (let j = 0; j < cantDaysMonth(mes + 1, anno); j++) {
                //     if (registerTmp.length > 0 && registerTmp[0]['dia'] === j + 1) {
                //         tmpReg[j] = registerTmp[i]['tiempo'];

                //     } else
                //         tmpReg[j] = 0;
                // }
                // tmp.tiempos = tmpReg;
                // todos.push(tmp);
                // console.log(tmpReg[j])
            }
            // obtener los proyectos e insertarle sus respectivos datos a control de obra
            // return  res.json(us);
            // for (let i = 0; i < us.length; i++) {
            //     let tmpObra = {
            //         id: us[i].id,
            //         nombre: us[i].Sub_proyecto.Proyecto.nombre,
            //         // dia:dia,
            //         mes: mes + 1,
            //         anno: anno,
            //         typ: 'obras'
            //     };
            //     let registerTmpObra = await ctrlObra.findAll({
            //         order: [
            //             ['dia', 'ASC']
            //         ],
            //     });
            // return res.json(registerTmpObra[0]['dia'])
            //     let tmpRegObra = [];
            //     for (let j = 0; j < cantDaysMonth(mes + 1, anno); j++) {
            //         if (tmpRegObra.length > 0 && registerTmpObra[0]['dia'] === j + 1) {
            //             tmpRegObra[j] = registerTmpObra[0]['tiempo'];

            //         } else
            //             tmpRegObra[j] = 0;
            //     }
            //     tmpObra.tiempos = tmpRegObra;
            //     todos.push(tmpObra);
            // }
            // const union = Object.assign(tmp, tmpObra);
            // var union = {...tmp, ...tmpObra};
            // return res.status(200).json(union);
            // var vale = Object.values(req.body.tiempos);
            // for (let n;n<=todos.length;n++){
            //     tmpO={
            //         dia:n+1,
            //         mes:todos.mes,
            //
            //     }
            // }
            // for (let h; h<=vale.length;h++){
            //     tmpObraO={
            //         tiempo:vale[h]
            //     }
            // }
            // const union = Object.assign(tmpO, tmpObraO);
            // return res.status(200).json(todos);
        },
        getEquipoById: async(req, res) => {
            console.log(req.params.id);
            let currentProyec = await equipo.findByPk(req.body.id);
            return res.status(200).json(currentProyec);
        },
        UpdateEquipo: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updproyect = await equipo.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updproyect)
            }
        },

        createEquipo: async(req, res) => {
            const newproyec = await equipo.create(req.body);
            return res.status(200).json(newproyec);
        },

        deleteEquipo: async(req, res) => {
            let id = req.params.id;
            const deletedTask = await equipo.destroy({
                where: {
                    id: id
                }
            });

            return res.status(200).json(deletedTask)

        }
    }

};