module.exports = app => {
    
    const cntrl=app.controllers.fechasController;

    // devuelve el dia de la semana dada una fecha
    app.post('/api/fechas/dia_semana',(req,res)=>{
        let d=cntrl.dayOfWeek(req.body.fecha);
        res.json(d)
    });

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
    app.post('/api/fechas/month_feriados',async (req,res)=>{
        let all=await cntrl.diasFeriados(req.body.mes,req.body.anno,app);
        res.json(all);
    })

}