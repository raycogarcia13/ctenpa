// const auth = require('../controllers/verifyController');

module.exports = app => {
    const control = app.controllers.userController;
    const log = app.controllers.verifyController;

    app.route('/api/user')
        .get(log.authenticated, control.getUsers)
        .delete(control.deleteUser)
        .put(control.createOrUpdateUser)
        .post(control.getUserById);
}