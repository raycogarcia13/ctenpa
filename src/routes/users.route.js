module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.verifyController;
    const vali = app.validaciones.userValidation;
    app.route('/api/user')
        .get(log.authenticated,vali.redireccionador, control.getUsers)
        .post(log.authenticated,control.createUser);
    app.route('/api/user/:id')
        .delete(log.authenticated, control.deleteUser)
        .get(log.authenticated, control.getUserById)
        .put(log.authenticated, control.UpdateUser);

        app.route('/api/user/changePass/:id')
        .put(log.authenticated,control.changePass); 
}