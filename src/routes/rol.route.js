module.exports = app => {
    const control = app.controllers.rolController;
    app.route('/api/rol')
        .get(control.getRoles)
        .delete(control.deleteRol)
        .put(control.createOrUpdateRol)
        .post(control.getRolById);
}