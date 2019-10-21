module.exports = app => {

    app.listen(app.get('port'),()=>{
        console.log('Servidor funcionando en puerto ',app.get('port'));
    });

}