class AuthError extends Error {
  constructor(message, subtype) {
    super(message);
    this.type = 'Auth';
    this.subtype = subtype;
    this.status = 401;
  }

  static middleware(error, req, res, next) {
    if (error.type === 'Auth') {
      res.status(error.status).json({
        errors: { [error.subtype]: error.message },
      });
    } else {
      next(error);
    }
  }
}

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const requestedUserExists = (req, res, next) => {
  if (req.requestedUser) {
    next();
  } else {
    res.sendStatus(400);
  }
};

const loggedInUserIsRequestedUser = (req, res, next) => {
  if (req.user.id !== req.requestedUser.id) {
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports = {
  AuthError,
  loggedIn,
  requestedUserExists,
  loggedInUserIsRequestedUser,
};
