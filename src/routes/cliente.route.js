module.exports = app => {
    const control = app.controllers.clienteController;
    app.route('/api/cliente')
        .get(control.getClientes)
        .post(control.createCliente);
    app.route('/api/cliente/:id')
        .delete(control.deleteCliente)
        .get(control.getClienteById)
        .put(control.UpdateCliente);

};