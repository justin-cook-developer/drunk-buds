const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const sessionMiddleware = require('./sessionMiddleware');
const serializeUserMiddleware = require('./serializeUserMiddleware');
const errorMiddleware = require('./errorMiddleware/index');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serializeUserMiddleware);

app.use('/auth', require('../auth/index'));
app.use('/api', require('../api/index'));

app.use(errorMiddleware);

module.exports = app;
