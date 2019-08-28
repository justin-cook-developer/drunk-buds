const router = require('express').Router();
const { loggedIn } = require('../../utils/backend');

router.use('/users', loggedIn, require('./users'));
router.use('/groups', require('./groups'));

module.exports = router;
