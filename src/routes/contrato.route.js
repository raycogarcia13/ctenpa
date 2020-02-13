module.exports = app => {
    const control = app.controllers.contratoController;
    app.route('/api/contrato')
        .get(control.getContratos)
        .post(control.createContrato);
    app.route('/api/contrato/:id')
        .delete(control.deleteContrato)
        .get(control.getContratosById)
        .put(control.UpdateContratos);

}