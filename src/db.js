import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'

let db = null;
module.exports = app => {

    const conf = app.libs.config;

    if (!db) {
        const sequelize = new Sequelize(conf.database, conf.username, conf.password, conf);

        db = {
            sequelize,
            Sequelize,
            models: {}
        }

        const dir = path.join(__dirname, 'models');
        fs.readdirSync(dir).forEach(file => {
            const md = path.join(dir, file);
            const m = sequelize.import(md);
            db.models[m.name] = m;
        });

        Object.keys(db.models).forEach(key => {
            // db.models[key].associate(db.models);
            if (db.models[key].hasOwnProperty('associate')) {
                db.models[key].associate(db.models);
            }

        })
    }

    return db;
}