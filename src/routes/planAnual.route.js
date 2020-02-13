module.exports = app => {
    const control = app.controllers.planAnualController;
    app.route('/api/planAnual')
        .get(control.getPlan)
        .post(control.createSalarioAnual);
    app.route('/api/planAnual/:year')
        .post(control.getPlanYear)
};