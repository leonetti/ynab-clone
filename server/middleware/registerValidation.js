const validEmail = require('../utils/validEmail');
const validPassword = require('../utils/validPassword');

module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  if (![email, name, password].every(Boolean)) {
    res.status(401).json({
      message: 'Missing Credentials',
    });
    return;
  }
  if (!validEmail(email)) {
    res.status(401).json({
      message: 'Invalid Email',
    });
    return;
  }
  if (password.length < 8) {
    res.status(401).json({
      message: 'Password must be at least 8 characters.',
    });
    return;
  }
  if (!validPassword(password)) {
    res.status(401).json({
      message: 'Password must contain 1 lowercase, 1 uppercase, and 1 numeric character.',
    });
    return;
  }

  next();
};
