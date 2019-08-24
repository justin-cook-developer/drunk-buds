const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || 'postgres://:5432/drunkBuds';

const connection = new Sequelize(url, {
  logging: false,
});

module.exports = connection;
