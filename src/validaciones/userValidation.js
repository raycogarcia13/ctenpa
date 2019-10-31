import jwt from 'jsonwebtoken'

module.exports = app =>{
    
      return{
         HasRole(role) {          
        return function(req, res, next) {
          let token = req.headers['secret'];          
          // decode 
          let getToken = jwt.decode(token);
          let rol = getToken.rol; 
          if (role !== rol) res.status(400).send("No tiene acceso");
          else next();
        }
      }
      }
         

}
    
         
   
