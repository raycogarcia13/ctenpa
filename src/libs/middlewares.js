import express from 'express';
// const apiRouteSecured = require('../routes/apiRouteSecured.route');
// const router = express.Router();


module.exports = app => {
    // config puerto
    app.set('port', process.env.PORT || 3000);
    //entornos
    app.set('env', 'development');

    // json
    app.use(express.json());


    app.use((req, res, next) => {
        next()
    })

    // rutas
    // app.use('/api', auth);

    // comprobar token




}