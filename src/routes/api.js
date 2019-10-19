module.exports = app => {

    app.get('/api', (req, res) => {
        res.json({
            status: "Api CtEnpa",
            entity: "UEB ENPA IJ"
        })
    });

}