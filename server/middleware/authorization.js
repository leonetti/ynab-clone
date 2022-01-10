const jwt = require('jsonwebtoken');

// this middleware will continue on if the token is inside the local storage

module.exports = (req, res, next) => {
  // Get token from header
  const jwtToken = req.header('jwt_token');

  // Check if not token
  if (!jwtToken) {
    res.status(403).json({ message: 'Not Authorized' });
    return;
  }

  // Check if token is valid
  try {
    const payload = jwt.verify(jwtToken, process.env.JWTSECRET);

    req.user = payload.user;
    next();
  } catch (error) {
    // 403 Forbidden - Unauthorized
    res.status(403).json({
      message: 'Not Authorized',
    });
  }
};
