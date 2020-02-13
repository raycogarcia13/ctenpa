module.exports = app => {
    const control = app.controllers.escalasController;

    app.route('/api/escala')
        .get(control.getEscala)
        .post(control.createEscala);

    app.route('/api/escala/:id')
        .delete(control.deleteEscala)
        .get(control.getEscalaById)
        .put(control.UpdateEscala);

    app.route('/api/escala/getOne')
        .post(control.getOneEscala);

};