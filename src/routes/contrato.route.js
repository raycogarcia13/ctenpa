module.exports = app => {
    const control = app.controllers.contratoController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/contrato')
        .get(control.getContratos)
        // .post(log.authenticated, vali('admin'), control.createContrato);
        .post(control.createContrato);
    app.route('/api/contrato/:id')
        .delete(control.deleteContrato)
        .get(control.getContratosById)
        .put(control.UpdateContratos);

}