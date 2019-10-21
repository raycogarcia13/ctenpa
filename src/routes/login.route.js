module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (!req.headers.authorization) {
            return next(new error_types.Error403("Missing Authorization header."));
        }
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: [process.env.JWT_ALGORITHM]
        }, (err, payload) => {
            if (err) { //comprueba validez, caducidad, etc.
                return next(new error_types.Error401(err.message));
            } else {
                User.findOne({
                        id: payload.sub
                    })
                    .then(data => {
                        if (data === null) { //no existe el usuario
                            //podríamos registrar el usuario
                            return next(new error_types.Error403("You are not allowed to access."));
                        }
                        /*encontramos el usuario así que procedemos a devolverlo para
                        inyectarlo en req.user de la petición en curso*/
                        else {
                            req.user = data;
                            next();
                        }
                    })
                    .catch(err => next(err)) //si hay un error en la consulta a db, lo devolvemos                
            }
        });
    }
}