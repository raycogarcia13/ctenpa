module.exports = app => {
    const control = app.controllers.cierreController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/cierre')
        .get(log.authenticated, vali('admin'), control.getCierre)
        .post(log.authenticated, vali('admin'), control.createCierre);
    app.route('/api/cierre/:id')
        .delete(log.authenticated, vali('admin'), control.deleteCierre)
        .get(log.authenticated, vali('admin'), control.getCierreById)
        .put(log.authenticated, vali('admin'), control.UpdateCierre);

}