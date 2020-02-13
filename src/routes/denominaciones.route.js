module.exports = app => {
    const control = app.controllers.denominacionesController;

    app.route('/api/denominacion')
        .get(control.getDenominaciones)
        .post(control.createDenominaciones);

    app.route('/api/denominacion/:id')
        .delete(control.deleteDenominaciones)
        .get(control.getDenominacionesById)
        .put(control.UpdateDenominaciones);

};