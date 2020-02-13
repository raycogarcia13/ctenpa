module.exports = app => {
    const control = app.controllers.salarioController;
    app.route('/api/salario/')
        .get(control.getSalario)
        .post(control.getSalarioAllProy);
}