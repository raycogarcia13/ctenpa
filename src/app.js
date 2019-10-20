import express from 'express';
import consign from 'consign';

const app = express();

app.use(express.static(__dirname+'/public'))

consign({
    cwd : __dirname
})
.include('./libs/config.js')
.then('./controllers')
.then('./db.js')
.then('./libs/middlewares.js')
.then('./routes')
.then('./libs/boot.js')
.into(app);

