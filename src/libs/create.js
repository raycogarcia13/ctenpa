module.exports = app => {

    app.db.sequelize.sync().done(()=>{
        console.log('Base de datos syncronizada creada correctamente');
    })

}