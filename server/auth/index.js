const router = require('express').Router();
const { userExists } = require('../../utils/backend');

router.get('/me', userExists, (req, res) => {
  res.json(req.user);
});

router.use('/local', require('./local'));

router.delete('/logout', userExists, (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
