const connection = require('./connection');
const User = require('./user');
const Group = require('./group');
const GroupMembers = require('./group_members');
const Session = require('./session');

Group.belongsToMany(User, { through: 'group_members' });
User.belongsToMany(Group, { through: 'group_members' });

Group.belongsTo(User, { as: 'creator' });

module.exports = {
  connection,
  User,
  Group,
  GroupMembers,
  Session,
};
