module.exports = app => {
    const control = app.controllers.control_actividadesController;
    app.route('/api/control_act')
        .get(control.getControlAct)
        .post(control.createControlAct);

    app.route('/api/control_act/:id')
        .delete(control.deleteControlAct)
        .get(control.getControlActById)
        .put(control.UpdateControlAct);

    app.route('/api/control_act/getOne')
        .post(control.getOne);

};