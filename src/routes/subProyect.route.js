module.exports = app => {
    const control = app.controllers.subProyectoController;
    const log = app.controllers.verifyController;

    app.route('/api/subproyecto')
        .get(log.authenticated, control.getSubProyectos)
        .post(log.authenticated, control.createSubProyecto);
    app.route('/api/subproyecto/:id')
        .delete(log.authenticated, control.deleteSubProyecto)
        .get(log.authenticated, control.getSubProyectosById)
        .put(log.authenticated, control.UpdateSubProyecto)
}