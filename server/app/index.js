const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const sessionMiddleware = require('./sessionMiddleware');
const serializeUserMiddleware = require('./serializeUserMiddleware');
const errorMiddleware = require('./errorMiddleware/index');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('gotSelf', user => {
    socket.userId = user.id;
  });

  socket.on('location', (long, lat) => {
    console.log(long, lat);

    if (socket.userId) {
      io.emit('userLocation', { userId: socket.userId, long, lat });
    }
  });

  socket.on('disconnect', () => {
    delete socket.userId;
  });
});

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(serializeUserMiddleware);

app.use('/auth', require('../auth/index'));
app.use('/api', require('../api/index'));

app.use(errorMiddleware);

module.exports = server;
