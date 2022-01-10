const validEmail = require('../utils/validEmail');

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (![email, password].every(Boolean)) {
    res.status(401).json({
      message: 'Missing Credentials',
    });
    return;
  } if (!validEmail(email)) {
    res.status(401).json({
      message: 'Invalid Email',
    });
    return;
  }

  next();
};
