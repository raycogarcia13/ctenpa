module.exports = app => {
    const control = app.controllers.clienteController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/cliente')
        .get(log.authenticated, vali('admin'), control.getClientes)
        // .post(log.authenticated, vali('admin'), control.createCliente);
        .post(control.createCliente);
    app.route('/api/cliente/:id')
        .delete(log.authenticated, vali('admin'), control.deleteCliente)
        .get(log.authenticated, vali('admin'), control.getClienteById)
        .put(log.authenticated, control.UpdateCliente);

}