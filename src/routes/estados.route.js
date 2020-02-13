module.exports = app => {
    const control = app.controllers.estadosController;

    app.route('/api/estados')
        .get(control.getEstados)
        .post(control.createEstados);

    app.route('/api/estados/:id')
        .delete(control.deleteEstados)
        .get(control.getEstadosById)
        .put(control.UpdateEstados);
};