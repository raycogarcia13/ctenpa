module.exports = app => {
    const control = app.controllers.rolController;
    app.route('/api/rol')
        .get(control.getRoles)
        .post(control.createRol);
    app.route('/api/rol/:id')
        .delete(control.deleteRol)
        .put(control.UpdateRol)
        .get(control.getRolById);
}