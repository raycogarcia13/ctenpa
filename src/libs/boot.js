import path from 'path'
module.exports = app => {
    app.get('*', (req, res) => {
        res.sendfile(path.resolve('src/public/index.html'));
    });
    app.listen(app.get('port'), () => {
        console.log('Servidor funcionando en puerto ', app.get('port'));
    });

    // app.db.models.Usuario.create({
    //     username:'kronos',
    //     password:'kronosk13',
    //     email:'rayco.garcia13@nauta.cu',
    //     RolId:'90f07d16-f4f7-11e9-b0b3-6155f7e7f629'
    // })

}