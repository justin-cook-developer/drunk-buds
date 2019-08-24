const router = require('express').Router();
const { loggedIn } = require('../../utils/backend');

router.get('/me', loggedIn, (req, res) => {
  res.json(req.user);
});

router.use('/local', require('./local'));

router.delete('/logout', loggedIn, (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
