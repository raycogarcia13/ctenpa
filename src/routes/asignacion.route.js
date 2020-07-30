module.exports = app => {
    const control = app.controllers.actividadController;
    app.route('/api/actividad')
        .get(control.getActividad)
        .post(control.createActividad);

    app.route('/api/actividad/:id')
        .delete(control.deleteActividad)
        .get(control.getActividadById)
        .put(control.UpdateActividad);

    app.route('/api/actividad/getOne')
        .post(control.getOne);

};