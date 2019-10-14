/* eslint-disable vue/valid-v-else-if */
module.exports = app => {

    app.get('/', (req, res) => {
        res.json({
            status: "Api CtEnpa",
            entity: "UEB ENPA IJ"
        })
    })

}