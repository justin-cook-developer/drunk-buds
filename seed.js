const { connection, User, Group, GroupMembers } = require('./server/db/index');

const testPlusNumber = number => 'test' + number;

const makeTestUser = number => {
  return {
    username: testPlusNumber(number),
    firstName: testPlusNumber(number),
    lastName: testPlusNumber(number),
    email: `test${number}@test.com`,
    password: testPlusNumber(number),
  };
};

const makeTestGroup = number => {
  return {
    name: testPlusNumber(number),
    agenda: testPlusNumber(number),
    location: testPlusNumber(number),
    startTime: new Date(),
  };
};

async function syncAndSeed() {
  try {
    await connection.sync({ force: true });

    const ids = [1, 2, 3, 4, 5];

    const users = await Promise.all(
      ids.map(num => makeTestUser(num)).map(user => User.create(user))
    );

    const groups = await Promise.all(
      ids
        .map(num => makeTestGroup(num))
        .map((group, i) => Group.create({ ...group, creatorId: users[i].id }))
    );

    ids.forEach(async (_, i) => {
      await GroupMembers.create({
        userId: users[i].id,
        groupId: groups[i].id,
      });
    });

    console.log('Seeded the db!');
  } catch (error) {
    console.error(error);
  }
}

syncAndSeed();
