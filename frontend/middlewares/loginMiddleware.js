const { verifyToken } = require('../util/jwt/index');

const loginMiddleware = (req, res, next) => {
  if (typeof req.cookies.jwt === 'undefined') return next();
  verifyToken(req, res, req.cookies.jwt);
  if (req.email) return res.redirect('/');
  return next();
}

module.exports = loginMiddleware;