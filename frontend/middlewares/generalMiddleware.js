const { verifyToken } = require('../util/jwt/index');

//Get the user details from token if the user is logged in
const generalMiddleware = (req, res, next) => {
  if (typeof req.cookies.jwt === 'undefined') return next();
  verifyToken(req, res, req.cookies.jwt);
  return next();
}

module.exports = generalMiddleware;