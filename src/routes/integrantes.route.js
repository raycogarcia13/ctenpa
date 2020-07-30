module.exports = app => {
    const control = app.controllers.integrantesController;
    app.route('/api/integrantes/')
        .get(control.getIntegrantes)
        .post(control.createIntegrantes);
    app.route('/api/integrantes/:id')
        .delete(control.deleteIntegrantes)
        .get(control.getIntegrantesById)
        .put(control.UpdateIntegrantes);
};
