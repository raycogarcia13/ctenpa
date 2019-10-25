import path from 'path'

module.exports = app => {

    app.get('/api', (req, res) => {
        // res.json({
        //     status: "Api CtEnpa",
        //     entity: "UEB ENPA IJ"
        // })
        res.sendFile(path.resolve('rutas.txt'));
    });

}