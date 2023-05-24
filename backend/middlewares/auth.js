const jwt = require('jsonwebtoken');
const { UnathorizedError } = require('../utils/error');

module.exports.validateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'secret-person-key');
  } catch (err) {
    return next(new UnathorizedError('Authorization required'));
  }

  req.user = payload;

  return next();
};
