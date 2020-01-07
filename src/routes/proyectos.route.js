module.exports = app => {
    const control = app.controllers.proyectoController;
    const log = app.controllers.verifyController;

    app.route('/api/proyecto')
        .get(log.authenticated, control.getProyectos)
        .post( control.createProyecto);
    app.route('/api/proyecto/:id')
        .delete(log.authenticated, control.deleteProyecto)
        .get(log.authenticated, control.getProyectosById)
        .put(log.authenticated, control.UpdateProyecto)
}