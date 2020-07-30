import moment from "moment";
import {Op} from 'sequelize'

module.exports = app => {
    const cierre = app.db.models.Cierre;
    const cierreProyecto = app.db.models.Cierre_proyecto;
    const proyectos = app.db.models.Proyectos;
    const trab = app.db.models.Trabajador;
    const subp = app.db.models.Sub_proyecto;
    const equipo = app.db.models.Equipo;
    // const cierreProyectista = app.db.models.Cierre_proyectista;
    // const cierreAct = app.db.models.Cierre_actividades;
    // const asig = app.db.models.Asignacion;
    // const integrantes = app.db.models.Integrantes;

    return {
        getCierre: async (req, res) => {
            let mes = (req.body.mes) ? req.body.mes : moment().format("M");
            let anno = (req.body.year) ? req.body.year : moment().format("YYYY");
            let us = await cierre.findAll({
                where:[{
                    anno,
                    mes
                }]
            });
            return res.status(200).json(us);
        },
        getCierreMes: async (req, res) => {
            var mes = (req.body.mes) ? req.body.mes : moment().format("M");
            var anno = (req.body.year) ? req.body.year : moment().format("YYYY");

            let qry = `SELECT equipo.nombre, sub_proyecto.codigo, sum(cierre_proyectista.acumulado_obras) AS acumulado,proyectos."id" FROM sub_proyecto 
            INNER JOIN asignacion ON sub_proyecto."id" = asignacion."EquipoId" INNER JOIN equipo ON equipo."id" = asignacion."SubProyectoId"
            INNER JOIN integrantes ON asignacion."id" = integrantes."AsignacionId" INNER JOIN cierre_proyectista ON sub_proyecto."id" = cierre_proyectista."SubProyectoId"
            INNER JOIN proyectos ON sub_proyecto."ProyectoId" = proyectos."id"
            where cierre_proyectista.anno=${anno} and cierre_proyectista.mes=${mes}
            GROUP BY equipo.nombre, sub_proyecto.codigo,proyectos.id;`

            let equipo = await app.db.sequelize.query(qry, {type: app.db.sequelize.QueryTypes.SELECT});

            try {
                for (let i = 0; i <equipo.length; i++) {
                let trabajadores=`SELECT trabajador.nombre || trabajador.apellidos AS trabajador,cierre_proyectista.acumulado_obras FROM
                cierre_proyectista INNER JOIN trabajador ON cierre_proyectista."TrabajadorId" = trabajador."id"
                INNER JOIN sub_proyecto ON cierre_proyectista."SubProyectoId" = sub_proyecto."id" WHERE sub_proyecto.codigo = '${equipo[i].codigo}'`
                    equipo[i].equipo = await app.db.sequelize.query(trabajadores, {type: app.db.sequelize.QueryTypes.SELECT});

                }
            } catch (e) {
                console.log(e)
            }

            return res.json(equipo);
            // return res.json(todos);


        },
        getCierreXProyecto: async (req, res) => {
            let us = await equipo.findAll({
                where: [{
                    SubProyectoId: req.params.id
                }],
                include: [
                    {model: subp, include: [{model: proyectos}]},
                    {model: trab}
                ]
            });
            return res.status(200).json(us);
        },
        getCierreById: async (req, res) => {
            console.log(req.params.id);
            let currentCierre = await cierre.findByPk(req.body.id);
            return res.status(200).json(currentCierre);
        },
        UpdateCierre: async (req, res) => {
            let id = req.params.id;
            // let upd={
            //     produccion_bruta: item.produccionb,
            //     produccion_mercantil: item.produccionm,
            //     produccion_cuc: item.produccionc,
            // };
            try {
                if (id) {
                    const updcierre = await cierre.update(req.body, {
                        where: {
                            id: id
                        }
                    });
                    return res.status(200).json(updcierre)
                }
            } catch (e) {
                res.json({
                    message: 'Error actualizando',
                    e
                })
            }

        },

        UpdateCierreP: async (req, res) => {
            let id = req.params.id;
            let item = req.body;
            if (id) {
                let upd = {
                    produccion_bruta: item.produccionb,
                    produccion_mercantil: item.produccionm,
                    produccion_cuc: item.produccionc,
                };
                const updcierre = await cierreProyecto.update(upd, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updcierre)
            }
        },

        createCierre: async (req, res) => {

            try {
                let nombrep = await proyectos.findOne({
                    where: [{
                        id: req.body.proyectoID
                    }],
                    attributes: ['nombre'],
                    raw: true
                });
                let codigop = await proyectos.findOne({
                    where: [{
                        id: req.body.proyectoID
                    }],
                    attributes: ['codigo'],
                    raw: true
                });
                let mes = moment().format("M");
                let year = moment().format("YYYY");
                let acumulado = 0;

                let acum = await cierre.findAll({
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: 1,
                    where: {
                        [Op.and]: [
                            {codigo: codigop.codigo},
                            // { EquipoId: req.body.EquipoId },
                            {mes: mes},
                            {anno: year},
                        ]
                    },
                    raw: true,
                });
                let prod_acum = 0;
                // let insert=(acum.length===0)?acum[0].produccion_acumulada=0:prod_acum=acum[0].produccion_acumulada;

                let test = acum.length === 0;
                // return ;
                if (test) {
                    let obj = {
                        produccion_acumulada: 0,
                    };
                    prod_acum = obj.produccion_acumulada;
                } else {
                    prod_acum = acum[0].produccion_acumulada
                }
                acumulado = parseFloat(prod_acum) + parseFloat(req.body.produccion_mercantil);
                const newcierre = await cierre.create({
                    codigo: codigop.codigo,
                    nombre: nombrep.nombre,
                    mes: mes,
                    anno: year,
                    produccion_bruta: req.body.produccion_bruta,
                    produccion_acumulada: acumulado,
                    produccion_mercantil: req.body.produccion_mercantil,
                    produccion_cuc: req.body.produccion_cuc,
                    // EquipoId:req.body.EquipoId
                });
                return res.status(200).json(newcierre);
            } catch (e) {
                console.log(e)
            }
        },
        deleteCierre: async (req, res) => {
            let id = req.params.id;
            const deletedCierre = await cierre.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(deletedCierre)
        }
    }

};
