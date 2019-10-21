import express from 'express';
import consign from 'consign';

const app = express();

app.use(express.static(__dirname+'/public'))

consign({
    .include('./libs/config.js')
    .then('./db.js')
    .then('./libs/middlewares.js')
    .then('./controllers')
    .then('./routes')
    .then('./libs/boot.js')
    .into(app);