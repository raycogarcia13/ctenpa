module.exports = app => {
        const control = app.controllers.feriadoController;
        const log = app.controllers.verifyController;

        app.route('/api/feriado')
            .get(log.authenticated, control.getferiados)
            .post(log.authenticated, control.createferiado);
        app.route('/api/feriado/:id')
            .delete(log.authenticated, control.deleteferiado)
            .get(log.authenticated, control.getferiadosById)
            .put(log.authenticated, control.Updateferiados)
}