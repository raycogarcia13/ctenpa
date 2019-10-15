import express from 'express';
import consign from 'consign';

const app = express();

consign({
    cwd : __dirname
})
.include('./libs/config.js')
.then('./db.js')
.then('./libs/create.js')
.into(app);



