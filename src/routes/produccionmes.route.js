module.exports = app => {
    const control = app.controllers.produccion_mesController;

    app.route('/api/produccion')
        .get(control.getproduccion)
        .post(control.createproduccion);
    app.route('api/produccion/:id')
        .delete(control.deleteproduccion)
        .put(control.Updateproduccion);


};