module.exports = app => {

    // const Rol = app.db.models.Rol;
    app.db.sequelize.sync().done(()=>{
        console.log('Base de datos syncronizada creada correctamente');
    })

}