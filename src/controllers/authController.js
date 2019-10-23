import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

module.exports = app => {
  const User = app.db.models.Usuario;
  return {
    login: (req, res, next) => {
      let params = req.body;
      let username = params.username;
      let password = params.password;
      User.findOne({
          where: {
            username: req.body.username
          },
          include: [{
            model: app.db.models.Rol,
          }]
        })
        .then(user => {
          // console.log(user);
          if (user === null) {
            return res.json({
              status: 401,
              msg: "Usuario incorrecta"
            }).status(401).send();
          } else {
            if (!bcrypt.compareSync(password, user.password))
              return res.json({
                status: 401,
                msg: "Contraseña incorrecta"
              }).status(401).send();
            else {
              console.log("*** comienza generacion token***");
              const payload = {
                sub: user.id,
                username: user.username,
                rolid: user.RolId,
                rol: user.Rol.rol
              };
              const token = jwt.sign(
                JSON.stringify(payload),
                process.env.JWT_SECRET, {
                  algorithm: process.env.JWT_ALGORITHM
                }
              );
              return res.status(200).header('secret', token).json({
                data: {
                  user: user,
                  token: token
                }
              });
            }
          }

        })
        .catch(err => next(err)); // error en DB
    }
  };
};