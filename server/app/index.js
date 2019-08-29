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
const { GroupMembers } = require('../db/index');

io.on('connection', socket => {
  socket.on('location', async (long, lat) => {
    console.log(long, lat);

    if (socket.userId) {
      // refreshable cache
      // pojo
      // use an interval to make the db call
      // redis is most ideal -- do not go there
      const groupIds = await GroupMembers.findAll({
        where: { userId: socket.userId },
        attributes: ['groupId'],
      });

      io.emit('userLocation', {
        userId: socket.userId,
        firstName: socket.firstName,
        long,
        lat,
        groupIds: groupIds.map(obj => obj.groupId),
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
