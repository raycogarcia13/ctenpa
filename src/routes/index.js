const apiRoutes = require('../routes/rol.route');
const apiRouteslogin = require('../routes/login.route');
const userRoute = require('../routes/users.route');
module.exports = app => {

    app.get('/api', (req, res) => {
        res.json({
            status: "Api CtEnpa",
            entity: "UEB ENPA IJ"
        })
    });

    // login
    // app.post('/api/login', apiRouteslogin.login);

    // roles
    app.get('/api/rol', apiRoutes.loadRoles);
    // app.post('/api/rol', apiRoutes.newRol);

    // usuarios
    app.get('/api/user', userRoute.loadUsers);

}