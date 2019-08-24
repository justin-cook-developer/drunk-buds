const session = require('express-session');
const createSequelizeStore = require('connect-session-sequelize');
const { connection } = require('../db/index');

const secret = process.env.SECRET || 'baaaad secret';

const SessionStore = createSequelizeStore(session.Store);

function extendDefaultFields(defaults, _session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: _session.userId,
  };
}

const store = new SessionStore({
  db: connection,
  table: 'session',
  extendDefaultFields,
});

const sessionMiddleware = session({
  secret,
  store,
  saveUninitialized: true,
  resave: false,
});

module.exports = sessionMiddleware;
