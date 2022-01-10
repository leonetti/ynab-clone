const router = require('express').Router();
const db = require('../db');

// Middleware
const authorization = require('../middleware/authorization');

/*
************
LOGIN A USER
************
*/
router.get('/', authorization, async (req, res) => {
  try {
    // req.user is user_id returned from authorization.js
    const user = await db.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [req.user],
    );

    res.status(200).json({
      data: {
        user: user.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
