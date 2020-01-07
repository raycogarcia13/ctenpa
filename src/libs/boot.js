import path from 'path'
module.exports = app => {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('src/public/index.html'));
    });
    app.listen(app.get('port'), () => {
        console.log('Servidor funcionando en puerto ', app.get('port'));
    });
    // app.db.models.Usuario.create({username:"admin",descripcion:"El que proyecta jejeje",password:"many92",email:"many@locol.cu",RolId:"52abea00-178c-11ea-b8ce-91776b0bb749"});
    // app.db.models.Rol.create({rol:"admin",name:"Administrador"});
}