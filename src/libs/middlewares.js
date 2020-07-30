import express from 'express';
import cors from 'cors';
// const apiRouteSecured = require('../routes/apiRouteSecured.route');
// const router = express.Router();


module.exports = app => {
    // config puerto
    app.set('port', process.env.PORT || 3000);
    //entornos
    app.set('env', 'development');

    // json
    app.use(cors());
    app.use(express.json());


    app.use((req, res, next) => {
        next()
    })

}
