const handleSequelizeErrors = require('./sequelizeErrors/index');

const errorMiddleware = (error, req, res, next) => {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return res.json(handleSequelizeErrors(error.errors));
  }
  next(error);
};

module.exports = errorMiddleware;
