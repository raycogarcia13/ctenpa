module.exports = {
    login: (req, res, next) => {
        console.log("caso login");
        var params = req.body;
        var username = params.username;
        var password = params.password;
        User.findOne({
                username: username
            })
            .then(user => {
                if (user === null || !bcrypt.compareSync(password, user.password))
                    next(new error_types.Error404("Usuario o Contraseña incorrecta"));
                else {
                    console.log("*** comienza generacion token*****");
                    const payload = {
                        sub: user.id,
                        exp: Math.round(Date.now() / 1000) + parseInt(process.env.JWT_LIFETIME),
                        username: user.username
                    };
                    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {
                        algorithm: process.env.JWT_ALGORITHM
                    });
                    res.json({
                        data: {
                            token: token
                        }
                    });
                }
            })
            .catch(err => next(err)) // error en DB
    }

}