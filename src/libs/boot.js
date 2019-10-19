module.exports = app => {

    app.listen(app.get('port'), () => {
        console.log('Servidor funcionando en puerto ', app.get('port'));
    });
    // app.db.models.Usuario.create({
    //     username: 'admin',
    //     password: 'many92',
    //     descripcion: 'este es el usuario administrador',
    //     email: 'geomatica4@enpa.iju.minag.cu',
    //     RolId: '406e0696-f287-11e9-a73d-ddbca5ed2f5e'
    // });
}