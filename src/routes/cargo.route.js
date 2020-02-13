module.exports = app => {
    const control = app.controllers.cargoController;

    app.route('/api/cargo')
        .get(control.getCargos)
        .post(control.createCargo);

    app.route('/api/cargo/:id')
        .delete(control.deleteCargo)
        .get(control.getCargoById)
        .put(control.UpdateCargo);

    app.route('/api/cargo/getOne')
        .post(control.getOneCargo);

};