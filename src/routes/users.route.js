module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/user')
        .get(log.authenticated, vali('admin'), control.getUsers)
        // .post(log.authenticated, vali('admin'), control.createUser);
        .post(control.createUser);
    app.route('/api/user/:id')
        .delete(log.authenticated, vali('admin'), control.deleteUser)
        .get(log.authenticated, vali('admin'), control.getUserById)
        .put(log.authenticated, control.UpdateUser);

    app.route('/api/user/changePass/:id')
        .put(log.authenticated, vali('admin'), control.changePass);
    app.route('/api/user/changePassAdmin/:id')
        .put(log.authenticated, vali('admin'), control.changePassAdmin);
    app.route('/api/user/count')
        .post(control.countalluser);
    app.route('/api/user/ver')
        .post(log.authenticated, log.ver);
}