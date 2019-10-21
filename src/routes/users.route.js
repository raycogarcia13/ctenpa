const control = require('../controllers/userController');
module.exports = {
    loadUsers: async (req, res) => {
        const usuarios = await control.getUsers()
        res.status(200) // 200 => Todo está O.K.
        return usuarios;
    },
    loadTasks: async (req, res) => {
        const Entries = await control.getAlimentos()
        res.status(200) // 200 => Todo está O.K.
        res.json(Entries);

    },
    loadTask: async (req, res) => {
        const Entry = await control.getAlimentobyId(req.params.id)
        res.status(200)
        res.json(Entry)
    },
    newAlimento: async (req, res) => {
        const newEntry = await control.createOrUpdateAlimento(req.body)
        res.status(201) // 201 => Hay nuevo contenido.        
        res.json(newEntry)

    },

    updateAlimento: async (req, res) => {
        const id = req.params.id;
        const updatedEntry = await control.createOrUpdateAlimento(req.body)
        // console.log(req.body);
        res.status(201)
        res.json(updatedEntry)
    },
    deleteAlim: async (req, res) => {
        const deletedEntry = await control.deleteAlimentos(req.params.id)
        res.status(204) // 204 => No existe contenido.
        res.json(deletedEntry)
    }
}