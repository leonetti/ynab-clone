require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

/*
MIDDLEWARE
*/

// Express Middleware
app.use(express.json()); // req.body

// Third Party Middleware
app.use(cors());

/*
ROUTES
*/

// Register and Login Routes
app.use('/api/v1/auth', require('./routes/jwtAuth'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
