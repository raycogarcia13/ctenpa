import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

module.exports = app => {
    const User = app.db.models.Usuario;
    const rol = app.db.models.Rol;
    const trab = app.db.models.Trabajador;
    return {
        login: (req, res, next) => {
            let params = req.body;
            let username = params.username;
            let password = params.password;

           let tk= User.findOne({
                    where: {
                        username: req.body.username
                    },
                    include: [{
                        model: app.db.models.Rol,
                    }]
                })
                .then(user => {
                    console.log(tk);
                    if (user === null) {
                        return res.status(401).send("Usuario incorrecto");
                    } else {
                        if (!bcrypt.compareSync(password, user.password))
                            return res.status(401).send("Contrase単a incorrecta");
                        else {
                            let idtrab = trab.findOne({
                                include: [{ model: User }],
                                where: [{
                                    UsuarioId:user.id
                                }]
                            });
                            console.log("*** comienza generacion token***");
                            const payload = {
                                sub: user.id,
                                username: user.username,
                                rolid: user.RolId,
                                rol: user.Rol.rol,
                                trabajador:idtrab
                            };
                            const token = jwt.sign(
                                JSON.stringify(payload),
                                process.env.JWT_SECRET, {
                                    algorithm: process.env.JWT_ALGORITHM
                                }
                            );
                            console.log(token);
                            return res.status(200).header('secret', token).json({
                                data: {
                                    user: user,
                                    payload:payload,
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