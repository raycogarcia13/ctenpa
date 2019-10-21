module.exports = app => {
    return {
        getRol:async (req,res)=>{
            let todos=await app.db.models.Rol.findAll();
            return res.json(todos);
        }
    }
}