module.exports = app => {
    const control = app.controllers.equipoController;
    const log = app.controllers.verifyController;

    app.route('/api/equipo')
        .get(log.authenticated, control.getEquipos)
        .post(log.authenticated, control.createEquipo);
    app.route('/api/equipo/:id')
        .delete(log.authenticated, control.deleteEquipo)
        .get(log.authenticated, control.getEquipoById)
        .put(log.authenticated, control.UpdateEquipo);
    app.route('/api/equipo/ct/:id')
        .post(control.getCT);
    app.route('/api/equipo/ct')
        .post(control.getCT);
    app.route('/api/equipo/trab/:id')
        .get(control.getTrabXid);
    app.route('/api/equipo/equixtrab/:id')
        .get(control.getEquipXtrab);
};