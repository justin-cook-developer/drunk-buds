if (!process.env.IS_PRODUCTION) {
  require('dotenv').config();
}

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
const Cache = require('../../cache');

const cache = new Cache(60);

io.on('connection', socket => {
  socket.on('location', async (long, lat) => {
    if (socket.userId) {
      const groupIds = await cache.get(socket.userId);
      io.emit('userLocation', {
        userId: socket.userId,
        firstName: socket.firstName,
        long,
        lat,
        groupIds,
      });
    }
  });

  socket.on('gotSelf', user => {
    socket.userId = user.id;
    socket.firstName = user.firstName;
  });

  socket.on('logoutSelf', () => {
    delete socket.userId;
    delete socket.firstName;
  });

  socket.on('disconnect', () => {
    delete socket.userId;
  });
});

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(serializeUserMiddleware);

app.use('/auth', require('../auth/index'));
app.use('/api', require('../api/index'));

app.use(errorMiddleware);

module.exports = server;
