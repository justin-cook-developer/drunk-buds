const router = require('express').Router();
const { User } = require('../db/index');
const { AuthError } = require('../../utils/backend');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.signup(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/login', async (req, res, next) => {
  try {
    const user = await User.login(req.body.username, req.body.password);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.use(AuthError.middleware);

module.exports = router;
