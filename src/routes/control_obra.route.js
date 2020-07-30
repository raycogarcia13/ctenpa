module.exports = app => {
    const control = app.controllers.control_obraController;
    app.route('/api/control_obra')
        .get(control.getControlObra)
        .post(control.createControlObra);

    app.route('/api/control_obra/:id')
        .delete(control.deleteControlAct)
        .get(control.getControlActById)
        .put(control.UpdateControlAct);

    app.route('/api/control_obra/getOne')
        .post(control.getOne);
    app.route('/api/control_obra/validar')
        .post(control.validarTime);

};
