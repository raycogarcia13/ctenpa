module.exports = app => {
    const control = app.controllers.equipoController;
    app.route('/api/equipo')
        .get(control.getEquipos)
        .post(control.createEquipo);
    app.route('/api/equipo/:id')
        .delete(control.deleteEquipo)
        .get(control.getEquipoById)
        .put(control.UpdateEquipo);
    app.route('/api/equipo/ct/:id')
        .post(control.getCT);
    app.route('/api/equipo/ct')
        .post(control.getCT);
    app.route('/api/equipo/trab/:id')
        .get(control.getTrabXid);
    app.route('/api/equipo/equixtrab/:id')
        .get(control.getEquipXtrab);

    app.route('/api/equipo/totalH/:id/:dia/:mes/:anno')
        .get(control.getDiaProyecxHoras);
    app.route('/api/equipo/totalHmes/:id/:mes/:anno')
        .get(control.getDiaProyecxHorasMes);
};
