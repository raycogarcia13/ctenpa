import moment from "moment";
import {Op} from 'sequelize'
module.exports = app => {
    const cierre = app.db.models.Cierre;
    const cierreProyecto = app.db.models.Cierre_proyecto;
    const proyectos = app.db.models.Proyectos;
    const trab = app.db.models.Trabajador;
    const subp = app.db.models.Sub_proyecto;
    const equipo = app.db.models.Equipo;
    const cierreProyectista = app.db.models.Cierre_proyectista;
    const cierreAct = app.db.models.Cierre_actividades;
    const asig = app.db.models.Asignacion;
    const integrantes = app.db.models.Integrantes;

    return {
        getCierre: async(req, res) => {
            let us = await cierre.findAll();
            return res.status(200).json(us);
        },
        getCierreMes: async(req, res) => {
            var mes = (req.body.mes)?req.body.mes:moment().format("M");
            var anno = (req.body.year)?req.body.year:moment().format("YYYY");
            // let cierre= await app.db.sequelize.query("Select * from f_cierreproyecto() where mes= '" + mes + "' and anno= '" + anno + "'", { type: app.db.sequelize.QueryTypes.SELECT });

            let cp = await cierreProyecto.findAll({
                where:{
                    mes,
                    anno
                },
                include:[{model:proyectos, attributes:['id','codigo','nombre'], include:[{model:subp}]}],
                raw:true
            });

            let cproyectista = await cierreProyectista.findAll({
                where:{
                    mes,
                    anno,
                    // SubProyectoId:cp[i]["Proyecto.Sub_proyectos.id"]
                },
                include:[{model:subp,
                    attributes:['id'],
                    include:[{model:proyectos,attributes:['id']}]},{model:trab,
                    attributes:['id','nombre','apellidos']
                }],
                raw:true
            });
            // return res.json({
            //     cp,
            //     cproyectista
            // });
            let v=[];
            for (let i = 0; i <cp.length ; i++) {
                let cproyectista = await cierreProyectista.findAll({
                    where:{
                        mes,
                        anno,
                        SubProyectoId:cp[i]["Proyecto.Sub_proyectos.id"]
                    },
                    include:[{model:subp,
                        attributes:['id'],
                        include:[{model:proyectos,attributes:['id']}]},{model:trab,
                        attributes:['id','nombre','apellidos']
                    }],
                    raw:true
                });
                let obj={
                    id:cp[i].id,
                    proyectoID:cp[i].ProyectoId,
                    codigo:cp[i]["Proyecto.codigo"],
                    actividades:cp[i]["Proyecto.nombre"],
                    produccion_bruta:cp[i]["produccion_bruta"],
                    produccion_mercantil:cp[i]["produccion_mercantil"],
                    produccion_cuc:cp[i]["produccion_cuc"],
                    equipo:cproyectista

                };
                v.push(obj)
            }

            // return res.json(cp);
            return res.json(v);


        },
        getCierreXProyecto: async(req, res) => {
            let us = await equipo.findAll({
                where: [{
                    SubProyectoId:req.params.id
                }],
                include: [
                    { model: subp, include: [{ model: proyectos }] },
                    { model: trab}
                ]
            });
            return res.status(200).json(us);
        },
        getCierreById: async(req, res) => {
            console.log(req.params.id);
            let currentCierre = await cierre.findByPk(req.body.id);
            return res.status(200).json(currentCierre);
        },
        UpdateCierre: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcierre = await cierre.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updcierre)
            }
        },

        UpdateCierreP: async(req, res) => {
            let id = req.params.id;
            if (id) {
                const updcierre = await cierreProyecto.update(req.body, {
                    where: {
                        id: id
                    }
                });
                return res.status(200).json(updcierre)
            }
        },

        createCierre: async(req, res) => {

            try {
                let nombrep = await  proyectos.findOne({
                    where:[{
                        id:req.body.proyectoId
                    }],
                    attributes:['nombre'],
                    raw:true
                });
                let codigop = await  proyectos.findOne({
                    where:[{
                        id:req.body.proyectoId
                    }],
                    attributes:['codigo'],
                    raw:true
                });
                let mes= moment().format("M");
                let year = moment().format("YY");
                let acumulado=0;

                let acum = await cierre.findAll({
                    order:[
                        ['id','DESC']
                    ],
                    limit:1,
                    where: {
                        [Op.and]: [
                            { codigo: codigop.codigo },
                            { EquipoId: req.body.EquipoId },
                            { mes: mes },
                            { anno: year },
                        ]
                    },
                    raw:true,
                });
                let prod_acum=0;
               // let insert=(acum.length===0)?acum[0].produccion_acumulada=0:prod_acum=acum[0].produccion_acumulada;

                let test = acum.length===0;
                // return ;
                if (test)
                {
               let obj= {
                        produccion_acumulada: 0,
                    };
                   prod_acum=obj.produccion_acumulada;
                }
                else{
                    prod_acum=acum[0].produccion_acumulada
                }
                console.log(prod_acum);
                // return ;
                acumulado = parseFloat(prod_acum) + parseFloat(req.body.produccion_bruta);

                console.log(acumulado);
                const newcierre = await cierre.create({codigo:codigop.codigo,
                    nombre:nombrep.nombre,
                    mes:mes,
                    anno:year,
                    produccion_bruta:req.body.produccion_bruta,
                    produccion_acumulada:acumulado,
                    produccion_mercantil:req.body.produccion_mercantil,
                    produccion_cuc:req.body.produccion_cuc,
                    EquipoId:req.body.EquipoId});
                return res.status(200).json(newcierre);
            }catch (e) {
                console.log(e)
            }
        },

        deleteCierre: async(req, res) => {
            let id = req.params.id;
            const deletedCierre = await cierre.destroy({
                where: {
                    id: id
                }
            });
            res.send('se elimino');
            return res.status(200).json(deletedCierre)

        }
    }

};
