module.exports = app => {
    const control = app.controllers.rolController;
    app.route('/api/rol')
        .delete(control.deleteRol)
        .get(control.getRoles)
        .put(control.createOrUpdateRol)
        .post(control.getRolById);
}