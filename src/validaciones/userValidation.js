import jwt from 'jsonwebtoken'

module.exports = app =>{
    return{
         redireccionador:(token,rol, next)=>{
           token = req.headers['secret'];          
          // decode 
          let getToken = jwt.decode(token);
           rol = getToken.rol;           
         next()
         }
}
}
    
         
   
