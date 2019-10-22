 import jwt from 'jsonwebtoken'

 module.exports = app => {
     return {
         authenticated: async (req, res, next) => {
             console.log(req.headers['secret']);
             if (!req.headers['secret']) {
                 return res.status(401).send({
                     message: "No tienes acceso a este servicio"
                 });
             }
             let token = req.headers['secret'];
             try {
                 let verify = await jwt.verify(token, process.env.JWT_SECRET, process.env.JWT_ALGORITHM);
                 req.user = verify;
                 console.log(verify);
                 //  res.send(req.user);
                 next()
             } catch (error) {
                 res.status(400).send('Incorrecta la llave de acceso');
             }
         }
     }
 }