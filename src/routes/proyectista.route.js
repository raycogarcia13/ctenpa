module.exports = app => {
    const control = app.controllers.proyectistasController;
    const log = app.controllers.verifyController;

    app.route('/api/proyectista')
        .get(control.getProyectistas)
        .post(control.createProyectista);

    app.route('/api/proyectista/:id')
        .delete(control.deleteProyectista)
        .get(control.getProyectistaById)
        .put(control.UpdateProyectista);

    app.route('/api/proyectista/getXarea/:id')
        .get(control.getProyectistasXarea);
    app.route('/api/proyectista/count')
        .post(control.countallproyec);

    app.route('/api/proyectista/ct')
        .post(control.getCTProy);
    app.route('/api/proyectista/ct/:id')
        .post(control.getCTProy);
};