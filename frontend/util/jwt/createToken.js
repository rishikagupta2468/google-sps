require('dotenv').config();
const jwt = require('jsonwebtoken');

createToken = (userObject) => {
  const payload = {
    email: userObject.email,
    name: userObject.name,
    age: userObject.age,
    gender: userObject.gender
  }
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return token;
}

module.exports = createToken;