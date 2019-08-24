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

const userExists = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  AuthError,
  userExists,
};
