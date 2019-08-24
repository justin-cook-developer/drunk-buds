const {
  Model,
  STRING,
  BOOLEAN,
  TEXT,
  DATE,
  UUID,
  UUIDV4,
} = require('sequelize');
const connection = require('./connection');

class Group extends Model {}
Group.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    agenda: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    location: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    startTime: {
      type: DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    isActive: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: connection,
    modelName: 'group',
  }
);

module.exports = Group;
