import path from 'path'
module.exports = app => {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('src/public/index.html'));
    });
    app.listen(app.get('port'), () => {
        console.log('Servidor funcionando en puerto ', app.get('port'));
    });
    // app.db.models.Usuario.create({username:"Many92",descripcion:"Administrador del sitio",password:"many92",email:"many@locol.cu",RolId:"98dd2980-f86f-11e9-afbb-71f5fc64a3b4"});
}