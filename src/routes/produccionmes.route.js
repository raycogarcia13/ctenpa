module.exports = app => {
    const control = app.controllers.produccion_mesController;

    app.route('/api/produccion')
        // .get(control.getProyectistas)
        .post(control.createproduccion);


}