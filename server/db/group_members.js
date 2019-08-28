const { Model, UUID } = require('sequelize');
const connection = require('./connection');

class GroupMembers extends Model {}
GroupMembers.init(
  {
    userId: {
      type: UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    groupId: {
      type: UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: 'group_members',
  }
);

module.exports = GroupMembers;
