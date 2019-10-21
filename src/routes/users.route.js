module.exports = app => {
    const control = app.controllers.userController;
    app.route('/api/user')
        .get(control.getUsers)
        .delete(control.deleteUser)
        .put(control.createOrUpdateUser)
        .post(control.getUserById);
}