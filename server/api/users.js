const router = require('express').Router();
const { User } = require('../db/index');
const {
  requestedUserExists,
  loggedInUserIsRequestedUser,
  AuthError,
} = require('../../utils/backend');

// will make this queryable based on username
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/username/:username', async (req, res, next) => {
  try {
    console.log(req.params.username);
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    if (user) {
      res.json(user);
    } else {
      res.json({ errors: { username: 'User not found.' } });
    }
  } catch (error) {
    next(error);
  }
});

router.param('id', async (req, _, next, id) => {
  try {
    const user = await User.findOne({ where: { id } });
    req.requestedUser = user ? user : null;
    next();
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requestedUserExists, (req, res) =>
  res.json(req.requestedUser)
);

router.put(
  '/:id/password',
  requestedUserExists,
  loggedInUserIsRequestedUser,
  async (req, res, next) => {
    try {
      await User.comparePasswords(
        req.body.password,
        req.requestedUser.password
      );
      await req.requestedUser.update({ password: req.body.newPassword });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  requestedUserExists,
  loggedInUserIsRequestedUser,
  async (req, res, next) => {
    try {
      const { username, firstName, lastName, email } = req.body;

      await req.requestedUser.update({ username, firstName, lastName, email });
      await req.requestedUser.reload();

      res.json(req.requestedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  requestedUserExists,
  loggedInUserIsRequestedUser,
  async (req, res, next) => {
    try {
      await req.requestedUser.destroy();
      req.session.destroy(error => {
        if (error) {
          next(error);
        } else {
          res.sendStatus(204);
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

router.use(AuthError.middleware);

module.exports = router;
