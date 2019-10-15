module.exports = app => {

    app.db.sequelize.sync().done(()=>{
        app.listen(app.get('port'),()=>{
            console.log('Servidor funcionando en puerto ',app.get('port'));
        });
    })

}