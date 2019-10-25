module.exports = app => {
    const control = app.controllers.areaController;
    const log = app.controllers.verifyController;

    app.route('/api/area')
        .get(log.authenticated, control.getAreas)
        .post(log.authenticated, control.createArea);
    app.route('/api/area/:id')
        .delete(log.authenticated, control.deleteArea)
        .get(log.authenticated, control.getAreaById)
        .put(log.authenticated, control.UpdateArea)
}