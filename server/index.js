import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

mongoose.connect('mongodb://localhost:rss/agregator');

const port = 3030;
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const server = http.createServer(app);

server.listen(port);

console.log('Server listening on: ', port);
