const { User } = require('../db/index');

const serializeUserMiddleware = async (req, _, next) => {
  try {
    if (req.session.userId) {
      const user = await User.findOne({ where: { id: req.session.userId } });
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = serializeUserMiddleware;
