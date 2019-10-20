import express from 'express';

module.exports = app => {

    // config puerto
    app.set('port',process.env.PORT||3000);
    //entornos
    app.set('env', 'development');

    // json
    app.use(express.json());

    app.use((req,res,next)=>{
        next()
    })
}