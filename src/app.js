import express from 'express';
import consign from 'consign';


const app = express();

app.use("/app",express.static(__dirname + '/public'))

consign({
        cwd: __dirname
    })
    .include('./libs/config.js')
    .then('./db.js')
    .then('./libs/middlewares.js')
    .then('./validaciones')
    .then('./controllers')
    .then('./routes')
    .then('./libs/boot.js')
    .into(app);