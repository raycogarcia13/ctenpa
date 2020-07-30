module.exports = app => {
    const control = app.controllers.asignacionController;
    app.route('/api/asignacion')
        .get(control.getAsignacion)
        .post(control.createAsignacion);

    app.route('/api/asignacion/:id')
        .delete(control.deleteAsignacion)
        .get(control.getAsignacionById)
        .put(control.UpdateAsignacion);

    app.route('/api/actividad/getOne')
        .post(control.getOne);

};
