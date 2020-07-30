module.exports = app => {
    const control = app.controllers.proyectoController;
    const log = app.controllers.verifyController;

    app.route('/api/proyecto')
        .get(control.getProyectos)
        .post(control.createProyecto);
    app.route('/api/proyecto/:id')
        .delete(control.deleteProyecto)
        .get(control.getProyectosById)
        .put(control.UpdateProyecto);
    app.route('/api/proyecto/count')
        .post(control.countallProyectos);
};
