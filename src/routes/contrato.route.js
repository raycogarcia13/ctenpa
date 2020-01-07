module.exports = app => {
    const control = app.controllers.contratoController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/contrato')
        .get(log.authenticated, vali('admin'), control.getContratos)
        // .post(log.authenticated, vali('admin'), control.createContrato);
        .post(control.createContrato);
    app.route('/api/contrato/:id')
        .delete(log.authenticated, vali('admin'), control.deleteContrato)
        .get(log.authenticated, vali('admin'), control.getContratosById)
        .put(log.authenticated, control.UpdateContratos);

}