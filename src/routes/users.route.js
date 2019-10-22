// const auth = require('../controllers/verifyController');

module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.verifyController;

    app.route('/api/user')
        .get(log.authenticated, control.getUsers)
        .post(control.createUser);
    app.route('/api/user/:id')
        .delete(control.deleteUser)
        .get(control.getUserById)
        .put(control.UpdateUser)
}