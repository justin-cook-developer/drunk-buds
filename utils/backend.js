class AuthError extends Error {
  constructor(message, subtype) {
    super(message);
    this.type = 'Auth';
    this.subtype = subtype;
    this.status = 401;
  }

  middleware(error, req, res, next) {
    if (error.type === this.type) {
      res.status(this.status).json({
        errors: { [this.subtype]: this.message },
      });
    } else {
      next(error);
    }
  }
}

module.exports = {
  AuthError,
};
