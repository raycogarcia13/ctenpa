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
import moment from "moment";
module.exports = app => {
    const equipo = app.db.models.Equipo;
    const trabajador = app.db.models.Trabajador;
    const subp = app.db.models.Sub_proyecto;
    const proyec = app.db.models.Proyectos;
    const user = app.db.models.Usuario;
    const act = app.db.models.Actividades;
    const ctrlAct = app.db.models.Control_actividades;
    const ctrlObra = app.db.models.Control_obra;
    const integrante = app.db.models.Integrantes;
    const asig = app.db.models.Asignacion;
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
        getDiaProyecxHoras: async(req, res) => {
            let id = req.params.id;
            let dia = req.params.dia;
            let mes = req.params.mes;
            let anno = req.params.anno;
            let fecha = moment().format(dia + '/' + mes + '/' + anno);
            // return res.json(fecha);
            // let fecha =new Date(mes+'/'+dia+'/'+anno);
            let cantH = await app.controllers.fechasController.countHourDay(fecha);
            let ctrO = await ctrlObra.findAll({
                where: {
                    TrabajadorId: id,
                    dia: dia,
                    mes: mes,
                    anno: anno,
                },
                raw: true
            });
            let ctrA = await ctrlAct.findAll({
                where: {
                    TrabajadorId: id,
                    dia: dia,
                    mes: mes,
                    anno: anno,
                },
                raw: true
            });

            let suma = 0;
            for (let i = 0; i < ctrO.length; i++) {
                suma += ctrO[i]['tiempo'];
            }
            for (let i = 0; i < ctrA.length; i++) {
                suma += ctrA[i]['tiempo'];
            }

            return res.status(200).json({
                'status': (suma > cantH) ? true : false,
                'horasDia': cantH,
                'worked': suma
            })
        },
        getDiaProyecxHorasMes: async(req, res) => {
            let id = req.params.id;
            let mes = req.params.mes;
            let anno = req.params.anno;
            let cantH = await app.controllers.fechasController.horasDelMes(mes, anno);
            let ctrO = await ctrlObra.findAll({
                where: [{
                    TrabajadorId: id,
                    mes: mes,
                    anno: anno,
                }],
                raw: true
            });
            let ctrA = await ctrlAct.findAll({
                where: [{
                    TrabajadorId: id,
                    mes: mes,
                    anno: anno,
                }],
                raw: true
            });

            let suma = 0;
            for (let i = 0; i < ctrO.length; i++) {
                suma += ctrO[i]['tiempo'];
            }
            for (let i = 0; i < ctrA.length; i++) {
                suma += ctrA[i]['tiempo'];
            }

            return res.status(200).json({
                'status': (suma > cantH) ? true : false,
                'horasMes': cantH,
                'worked': suma
            })
        },
        getEquipXtrab: async(req, res) => {
            let usu = await trabajador.findOne({
                include: [{ model: user }],
                where: [{
                    UsuarioId: req.params.id
                }]
            });
            let e = await equipo.findOne({
                include: [{
                    model: asig,
                    include: [{
                        model: integrante,
                        where: [{
                            TrabajadorId: usu.id
                        }]
                    }]
                }],
                raw: true
            });
            return res.status(200).json(e);
        },
        getEquipos: async(req, res) => {
            let us = await equipo.findAll();
            return res.status(200).json(us);
        },

        getCT: async(req, res) => {
            let a = await act.findAll();
            let u = await trabajador.findOne({
                include: [{ model: user }],
                where: [{
                    UsuarioId: req.params.id
                }]
            });
            let us = await integrante.findAll({
                where: [{
                    TrabajadorId: u.id,
                }],
                include: [
                    { model: asig, include: [{ model: subp, include: [{ model: proyec }] }] }
                ],
                raw: true
            });
            // return res.json(us);
            let todos = [];
            var mes = (req.body.mes) ? req.body.mes : new Date().getMonth();
            var anno = (req.body.year) ? req.body.year : new Date().getFullYear();
            // return res.json(mes);
            for (let i = 0; i < a.length; i++) {
                let ctA = await ctrlAct.findAll({
                    where: {
                        "ActividadeId": a[i].id,
                        TrabajadorId: u.id,
                        mes: mes + 1,
                        anno
                    },
                    order: [
                        ['dia', 'ASC']
                    ],
                });
                let tmp = {
                    id: a[i].id,
                    nombre: a[i].actividad,
                    mes: mes + 1,
                    anno: anno,
                    typ: 'actividades'
                };
                let tmpReg = [];
                let it = 0;
                for (let j = 0; j < cantDaysMonth(mes + 1, anno); j++) {
                    if (ctA[it] != null) {
                        if (ctA[it]['dia'] === j + 1) {
                            tmpReg[j] = ctA[it]['tiempo'];
                            it++;
                        } else
                            tmpReg[j] = 0;
                    } else
                        tmpReg[j] = 0;

                }
                tmp.tiempos = tmpReg;
                todos.push(tmp);
            }
            // obtener los proyectos e insertarle sus respectivos datos a control de obra
            for (let i = 0; i < us.length; i++) {
                let tmpObra = {
                    id: us[i].id,
                    nombre: us[i]['Asignacion.Sub_proyecto.Proyecto.nombre'] + ' - ' + us[i]['Asignacion.Sub_proyecto.codigo'],
                    mes: mes + 1,
                    anno: anno,
                    SubProyectoId: us[i]['Asignacion.Sub_proyecto.id'],
                    typ: 'obras'
                };
                let registerTmpObra = await ctrlObra.findAll({
                    where: {
                        TrabajadorId: us[i].TrabajadorId,
                        SubProyectoId: us[i]['Asignacion.Sub_proyecto.id'],
                        mes: mes + 1,
                        anno
                    },
                    order: [
                        ['dia', 'ASC']
                    ],
                });
                // return res.json(registerTmpObra[0]['dia'])
                let tmpRegObra = [];
                let it = 0;
                for (let j = 0; j < cantDaysMonth(mes + 1, anno); j++) {
                    if (registerTmpObra[it] != null) {
                        if (registerTmpObra[it]['dia'] === j + 1) {
                            tmpRegObra[j] = registerTmpObra[it]['tiempo'];
                            it++;
                        } else
                            tmpRegObra[j] = 0;
                    } else
                        tmpRegObra[j] = 0;

                }
                tmpObra.tiempos = tmpRegObra;
                todos.push(tmpObra);
            }

            return res.status(200).json(todos);
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