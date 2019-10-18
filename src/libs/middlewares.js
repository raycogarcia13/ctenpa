import express from 'express';
import path from 'path';

module.exports = app => {

    // config puerto
    app.set('port', process.env.PORT || 3000);
    //entornos
    app.set('env', 'development');

    // json
    app.use(express.json());

    // static
    app.use(express.static(path.join(__dirname, 'public')));

    app.use((req, res, next) => {
        next()
    })
}