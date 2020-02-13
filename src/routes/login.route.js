module.exports = app => {
    const log = app.controllers.authController;
    app.post('/api/login', log.login);
};