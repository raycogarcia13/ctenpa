const conf = require('../config/config.json');
const env=process.env.NODE_ENV||'development';
const db=conf[env];
module.exports = {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: db.dialect,
    params:db.params
};