module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.verifyController;

    app.route('/api/user')
        .get(log.authenticated, control.getUsers)
        .post(log.authenticated, control.createUser);
    app.route('/api/user/:id')
        .delete(log.authenticated, control.deleteUser)
        .get(log.authenticated, control.getUserById)
        .put(log.authenticated, control.UpdateUser)
}