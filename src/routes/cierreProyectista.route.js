module.exports = app => {
    const control = app.controllers.cierreProyectistaController;
    app.route('/api/cierreProyectista')
        .get(control.getCierreProyectista)
        .post(control.createCierreP);

    app.route('/api/cierreProyectista/:id')
        .delete(control.deleteCierreP)
        .get(control.getCierrePById)
        .put(control.UpdateCierrePro);

};
