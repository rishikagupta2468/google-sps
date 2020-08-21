const { verifyToken } = require('../util/jwt/index');

//Redirects to login page if user is not logged in
const redirectMiddleware = (req, res, next) => {
  if (typeof req.cookies.jwt === 'undefined') return res.redirect('/authenticate/login');
  verifyToken(req, res, req.cookies.jwt);
  if (!req.email) return res.redirect('/authenticate/login');
  return next();
}

module.exports = redirectMiddleware;