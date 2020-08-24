require('dotenv').config();
const jwt = require('jsonwebtoken');

verifyToken = (req, res, token) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, obj) => {
    if (err) return;
    req.email = obj.email,
    req.name = obj.name,
    req.age = obj.age,
    req.gender = obj.gender
  });
}

module.exports = verifyToken;