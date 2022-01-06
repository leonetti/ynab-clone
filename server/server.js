require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Express Middleware
app.use(express.json()); // req.body

// Third Party Middleware
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
