 import jwt from 'jsonwebtoken'
 import { request } from 'express';
 module.exports = app => {
     return {
         authenticated: async(req, res, next) => {
             //  console.log(req.headers)
             if (!req.headers['secret']) {
                 return res.status(401).send({
                     message: "No tienes acceso a este servicio"
                 });
             }
             let token = req.headers['secret'];
             try {
                 let verify = await jwt.verify(token, process.env.JWT_SECRET, process.env.JWT_ALGORITHM);
                 req.user = verify;
                 //  res.send(req.user);
                 next()
             } catch (error) {
                 res.status(400).send('Incorrecta la llave de acceso');
             }
         },
         ver: async(req, res, next) => {
             console.log(req.headers)
             let token = req.headers['secret'];
             try {
                 let verify = await jwt.verify(token, process.env.JWT_SECRET, process.env.JWT_ALGORITHM);
                 const lol = req.user = verify;
                 //  req.user = verify;
                 //  console.log(verify);
                 console.log(req.user);
                 //  console.log(lol);
                 //  res.send(req.user);
                 next()
             } catch (error) {
                 res.status(400).send('Incorrecta la llave de acceso');
             }
         }
     }
 }