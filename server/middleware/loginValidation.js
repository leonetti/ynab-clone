const validEmail = require('../utils/validEmail');

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (![email, password].every(Boolean)) {
    res.status(401).json('Missing Credentials');
    return;
  } if (!validEmail(email)) {
    res.status(401).json('Invalid Email');
    return;
  }

  next();
};
