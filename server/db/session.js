const { Model, STRING, DATE } = require('sequelize');
const connection = require('./connection');

class Session extends Model {}
Session.init(
  {
    sid: {
      type: STRING,
      primaryKey: true,
    },
    userId: STRING,
    expires: DATE,
    data: STRING(50000),
  },
  { sequelize: connection, modelName: 'session' }
);

module.exports = Session;
