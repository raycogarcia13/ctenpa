import path from 'path'
module.exports = app => {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('src/public/index.html'));
    });
    app.listen(app.get('port'), () => {
        console.log('Servidor funcionando en puerto ', app.get('port'));
    });
    // app.db.models.Usuario.create({username:"Proyect100",descripcion:"El que proyecta jejeje",password:"many92full",email:"many@locol.cu",RolId:"220b9cf0-fb2c-11e9-954c-4bfb61125b6a"});
    // app.db.models.Rol.create({rol:"proyectista",name:"Proyectista"});
}