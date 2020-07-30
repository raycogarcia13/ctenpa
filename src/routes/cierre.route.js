module.exports = app => {
    const control = app.controllers.cierreController;
    // const log = app.controllers.verifyController;
    // const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/cierre')
        .get(control.getCierre)
        .post(control.createCierre);
    app.route('/api/cierre/:id')
        .delete(control.deleteCierre)
        .get(control.getCierreById)
        .put(control.UpdateCierre);
    app.route('/api/cierre/proyectXequipo/:id')
        .get(control.getCierreXProyecto);
    app.route('/api/cierre/getcierreMes')
        .post(control.getCierreMes);
    app.route('/api/cierrep/:id')
        .put(control.UpdateCierreP);
};
