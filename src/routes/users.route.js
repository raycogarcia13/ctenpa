module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation.HasRole;
    app.route('/api/user')
        .get(log.authenticated,vali('admin'), control.getUsers)
        .post(log.authenticated,vali('admin'),control.createUser);
    app.route('/api/user/:id')
        .delete(log.authenticated,vali('admin'),control.deleteUser)
        .get(log.authenticated,vali('admin'), control.getUserById)
        .put(log.authenticated, control.UpdateUser);

        app.route('/api/user/changePass/:id')
        .put(log.authenticated,vali('admin'),control.changePass); 
}