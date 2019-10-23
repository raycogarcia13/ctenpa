import path from 'path'
module.exports = app => {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('src/public/index.html'));
    });
    app.listen(app.get('port'), () => {
        console.log('Servidor funcionando en puerto ', app.get('port'));
    });
}