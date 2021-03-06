const router = require('express').Router();
const { Group, User, GroupMembers } = require('../db/index');
const {
  groupIdExists,
  userIdExists,
  loggedIn,
} = require('../../utils/backend');

router.get('/', loggedIn, async (req, res, next) => {
  try {
    const groups = await req.user.getGroups({ where: { isActive: true } });
    res.json(groups);
  } catch (error) {
    next(error);
  }
});

router.get('/:groupId', groupIdExists, async (req, res, next) => {
  try {
    const group_member = await GroupMembers.findOne({
      where: {
        userId: req.user.id,
        groupId: req.params.groupId,
      },
    });

    const group = await Group.findOne({
      where: { id: group_member.groupId, isActive: true },
      include: [{ model: User }],
    });

    res.json(group);
  } catch (error) {
    next(error);
  }
});

router.post('/', loggedIn, async (req, res, next) => {
  try {
    const { name, agenda, location, startTime } = req.body;

    const [group, created] = await Group.findOrCreate({
      where: {
        name,
        agenda,
        location,
        startTime,
        creatorId: req.user.id,
      },
    });

    if (created) {
      await GroupMembers.create({ userId: req.user.id, groupId: group.id });

      res.json(group);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:groupId/users/:userId',
  loggedIn,
  groupIdExists,
  userIdExists,
  async (req, res, next) => {
    try {
      const { groupId, userId } = req.params;

      const [_, created] = await GroupMembers.findOrCreate({
        where: {
          userId,
          groupId,
        },
      });

      if (created) {
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:groupId/users/:userId',
  loggedIn,
  groupIdExists,
  userIdExists,
  async (req, res, next) => {
    try {
      const { groupId, userId } = req.params;

      await GroupMembers.destroy({
        where: {
          userId,
          groupId,
        },
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:groupId', loggedIn, groupIdExists, async (req, res, next) => {
  try {
    const group = await Group.findOne({ where: { id: req.params.groupId } });

    if (group) {
      if (group.creatorId === req.user.id) {
        await group.update({ isActive: false });

        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(406);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
