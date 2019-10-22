import express from 'express';

module.exports = app => {

    // config puerto
    app.set('port', process.env.PORT || 3000);
    //entornos
    app.set('env', 'development');

    // json
    app.use(express.json());

    app.use((req, res, next) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
        next()
    })



}