module.exports = app => {
    const control = app.controllers.especialidadController;
    // const log = app.controllers.verifyController;

    app.route('/api/especialidad')
        .get(control.getEspecialidad)
        .post(control.createEspecialidad);
    app.route('/api/especialidad/:id')
        .delete(control.deleteEspecialidad)
        .get(control.getEspecialidadById)
        .put(control.UpdateEspecialidad)
}