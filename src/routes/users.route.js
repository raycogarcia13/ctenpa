module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.authController;
    app.route('/api/user')
        .get(log.authenticated, control.getUsers)
        .delete(control.deleteUser)
        .put(control.createOrUpdateUser)
        .post(control.getUserById);
}