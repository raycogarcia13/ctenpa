module.exports = app => {
    const control = app.controllers.areaController;
    const log = app.controllers.verifyController;

    app.route('/api/area')
        .get(control.getAreas)
        .post(control.createArea);

    app.route('/api/area/:id')
        .delete(control.deleteArea)
        .get(control.getAreaById)
        .put(control.UpdateArea);

    app.route('/api/area/getOne')
        .post(control.getOne);

}