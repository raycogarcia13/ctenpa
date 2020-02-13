module.exports = app => {
    const control = app.controllers.subProyectoController;
    app.route('/api/subproyecto')
        .get(control.getSubProyectos)
        .post(control.createSubProyecto);
    app.route('/api/subproyecto/:id')
        .delete(control.deleteSubProyecto)
        .get(control.getSubProyectosById)
        .put(control.UpdateSubProyecto)
};