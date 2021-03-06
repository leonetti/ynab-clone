const jwt = require('jsonwebtoken');

function jwtGenerator(userId) {
  const payload = {
    user: userId,
  };

  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1hr' });
}

module.exports = jwtGenerator;
