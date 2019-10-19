module.exports = app => {
    const control = app.controllers.rolController;
    app.route('/api/rol')
        .delete(control.deleteRol)
        .get(control.getRoles)
        .put(control.createOrUpdateRol)
        .post(control.getRolById);
    // app.post('api/rol/:id', control.getRolById);
    // .post();

    // return {

    //     loadRoles: async (req, res) => {
    //         const roles = await control.getRoles()
    //         res.status(200) // 200 => Todo está O.K.
    //         return roles;
    //     },
    //     loadTasks: async (req, res) => {
    //         const Entries = await control.getAlimentos()
    //         res.status(200) // 200 => Todo está O.K.
    //         res.json(Entries);

    //     },
    //     loadTask: async (req, res) => {
    //         const Entry = await control.getAlimentobyId(req.params.id)
    //         res.status(200)
    //         res.json(Entry)
    //     },
    //     newRol: async (req, res) => {
    //         const newEntry = await control.createOrUpdateRol(req.body)
    //         res.status(201) // 201 => Hay nuevo contenido.        
    //         res.json(newEntry)

    //     },

    //     updateAlimento: async (req, res) => {
    //         const id = req.params.id;
    //         const updatedEntry = await control.createOrUpdateAlimento(req.body)
    //         // console.log(req.body);
    //         res.status(201)
    //         res.json(updatedEntry)
    //     },
    //     deleteAlim: async (req, res) => {
    //         const deletedEntry = await control.deleteAlimentos(req.params.id)
    //         res.status(204) // 204 => No existe contenido.
    //         res.json(deletedEntry)
    //     }
    // }


}