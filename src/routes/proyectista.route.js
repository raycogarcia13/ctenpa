module.exports = app => {
    const control = app.controllers.proyectistasController;
    const log = app.controllers.verifyController;

    app.route('/api/proyectista')
        .get(control.getProyectistas)
        .post(control.createProyectista);
    app.route('/api/proyectista/:id')
        .delete(log.authenticated, control.deleteProyectista)
        .get(log.authenticated, control.getProyectistaById)
        .put(log.authenticated, control.UpdateProyectista);
}