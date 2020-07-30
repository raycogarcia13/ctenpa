module.exports = app => {

    const cntrl = app.controllers.fechasController;

    // devuelve el dia de la semana dada una fecha
    app.post('/api/fechas/dia_semana', cntrl.dayOfWeek);
    app.get('/api/fechas/dia_semana', cntrl.diaSemana);
    // devuelve la cantida de hroas de un dia en especifico
    app.post('/api/fechas/day_hours', (req, res) => {
        let cant = cntrl.countHourDay(req.body.dia);
        res.json({ hours: cant })
    });
    app.get('/api/fechas/day_hours', (req, res) => {
        let dia = new Date().getDay();
        console.log(dia)
        let cant = cntrl.countHourDaymio();
        res.json({ hours: cant })
    });

    // dado un mes y un año, devuelve la cantidad de horas del mismo
    app.post('/api/fechas/month_hours', async(req, res) => {
        // let data = new Date();
        // let month = data.getMonth();
        // let year = data.getFullYear();
        let cant = cntrl.countHourMonth(req.body.mes, req.body.anno);
        if (!cant) {
            return res.status(412).json({ msg: "Fecha no válida" });
        } else
            res.json({ hours: cant })

    });

    app.get('/api/fechas/horasMes/', async(req, res) => {

        let cant = cntrl.horasDelMes();
        if (!cant) {
            return res.status(412).json({ msg: "Fecha no válida" });
        } else
            res.json({ hours: cant })

    });
    // dado un mes y un año, devuelve los dias feriados del mismo
    app.get('/api/fechas/month_feriados/:mes/:anno', async(req, res) => {
        let all = await cntrl.diasFeriados(req.params.mes, req.params.anno, app);
        res.json(all);
    });

    app.get('/api/fechas/dias/', async(req, res) => {
        let all = await cntrl.getDiasmes();
        res.json(all);
        // return all;
    });

    app.post('/api/fechas/month_feriados', (req, res) => {
        var fecha = new Date(req.body.fecha);
        var fecha_utc = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate(), fecha.getUTCHours(), fecha.getUTCMinutes(), fecha.getUTCSeconds());
        app.db.models.Feriados.create({
                fecha: fecha_utc,
                motivo: req.body.motivo
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message })
            })
    })

};