const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const db = require('../db');

// Register a User
router.post('/register', async (req, res) => {
  try {
    // 1. Destructure req.body (name, email, password)
    const { name, email, password } = req.body;

    // 2. Check if user exists (if user exists - throw error)
    const user = await db.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email],
    );

    if (user.rows.length !== 0) {
      // 401 Unauthenticated - User already exists
      res.status(401).json({
        message: 'User already exists',
      });
      return;
    }

    // 3. Bcrypt the user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Enter the new user in our database
    const newUser = await db.query(
      'INSERT INTO users (user_name, user_email, user_password) values ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword],
    );

    // 5. Generate our JWT Token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.status(200).json({ token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// Login a User
router.post('/login', async (req, res) => {
  try {
    // 1. Destructe req.body
    const { email, password } = req.body;

    // 2. Check if user exists (if user does not exist - throw error)
    const user = await db.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email],
    );

    if (user.rows.length === 0) {
      // 401 Unauthenticated - email does not exist
      res.status(401).json({
        message: 'Email is Incorrect',
      });
      return;
    }

    // 3. Check if incoming password is same as database password
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      // 401 Unauthenticated - wrong password
      res.status(401).json({
        message: 'Password is Incorrect',
      });
      return;
    }

    // 4. Give user JWT Token
    const token = jwtGenerator(user.rows[0].user_id);
    res.status(200).json({ token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
