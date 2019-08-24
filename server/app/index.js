const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const session = require('./sessionMiddleware');
const serializeUser = require('./serializeUserMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

app.use(session);
app.use(serializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => res.send('hello'));

module.exports = app;
