module.exports = app => {
    const control = app.controllers.empresaController;


    app.route('/api/empresa')
        .get(control.getEmpresa)
        .post(control.createEmpresa);

    app.route('/api/empresa/:id')
        .delete(control.deleteEmpresa)
        .get(control.getEmpresaById)
        .put(control.UpdateEmpresa);
};