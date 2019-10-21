import path from 'path'

module.exports = app => {
    // ruta para la vista en caso de que no exista la petición en el router de express
    app.get('*', (req, res) => {
        res.sendfile(path.resolve('src/public/index.html'));
    });
}