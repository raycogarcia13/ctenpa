import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

module.exports = app => {
  const User = app.db.models.Usuario;
  return {
    login: (req, res, next) => {
      console.log("caso login");
      let params = req.body;
      let username = params.username;
      let password = params.password;
      User.findOne({
          where: {
            username: req.body.username
          }
        })
        .then(user => {
          if (user === null || !bcrypt.compareSync(password, user.password))
            next(res.send("Usuario o Contraseña incorrecta"));
          else {
            console.log(user.id);
            console.log("*** comienza generacion token***");
            const payload = {
              sub: user.id,
              exp: Math.round(Date.now() / 10) +
                parseInt(process.env.JWT_LIFETIME),
              username: user.username
            };
            const token = jwt.sign(
              JSON.stringify(payload),
              process.env.JWT_SECRET, {
                algorithm: process.env.JWT_ALGORITHM
              }
            );
            // localStorage.setItem("token", JSON.stringify(token));
            store.set("token", JSON.stringify(token));
            res.header("auth-token", token).json({
              data: {
                token: token
              }
            });
          }
        })
        .catch(err => next(err)); // error en DB
    },

    authenticated: (req, res, next) => {
      User.findByPk(req.body.id);
      //   let username = req.body.username;

      if (!req.headers.authorization) {
        return res.status(403).send({
          message: "Tu petición no tiene cabecera de autorización"
        });
      }

      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(
        token,
        process.env.JWT_SECRET, {
          algorithms: [process.env.JWT_ALGORITHM]
        },
        (err, payload) => {
          if (err) {
            //comprueba validez, caducidad, etc.
            return next(res.send(err.message));
          } else {
            User.findOne({
                id: payload.sub
              })
              .then(data => {
                if (data === null) {
                  //no existe el usuario
                  //podríamos registrar el usuario
                  return next(res.send("You are not allowed to access."));
                } else {
                  /*encontramos el usuario así que procedemos a devolverlo para
                                                inyectarlo en req.user de la petición en curso*/
                  req.user = data;
                  console.log(data);
                  // res.send(data);
                  next();
                }
              })
              .catch(err => next(err)); //si hay un error en la consulta a db, lo devolvemos
          }
        }
      );
    }
  };
};