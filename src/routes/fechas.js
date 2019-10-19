module.exports = app => {
    
    const cntrl=app.controllers.fechasController;

    // devuelve el dia de la semana dada una fecha
    app.post('/api/fechas/dia_semana',cntrl.dayOfWeek)//(req,res)=>{
        // let d=cntrl.dayOfWeek(req.body.fecha);
        // res.json(d)
    // });

    // devuelve la cantida de hroas de un dia en especifico
    app.post('/api/fechas/day_hours',(req,res)=>{
        let cant=cntrl.countHourDay(req.body.fecha);
        res.json({hours:cant})
    })

    // dado un mes y un año, devuelve la cantidad de horas del mismo
    app.post('/api/fechas/month_hours',(req,res)=>{
        let cant=cntrl.countHourMonth(req.body.mes,req.body.anno);
        if(!cant)
            return res.status(412).json({msg:"Fecha no válida"});
            
        res.json({hours:cant})
    })

    // dado un mes y un año, devuelve los dias feriados del mismo
    app.get('/api/fechas/month_feriados/:mes/:anno',async (req,res)=>{
        let all=await cntrl.diasFeriados(req.params.mes,req.params.anno,app);
        res.json(all);
    })
    
    app.post('/api/fechas/month_feriados', (req,res)=>{
        app.db.models.Feriados.create({
            fecha:new Date(req.body.fecha),
            motivo:req.body.motivo
        })
        .then(result=>res.json(result))
        .catch(error=>{
            res.status(412).json({msg:error.message})
        })
    })

}