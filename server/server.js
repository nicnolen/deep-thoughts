const express = require('express');
const db = require('./config/connection'); // Import Mongoose database connection

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Listen for connection to be made the first time the database is opened using db.once('open')
db.once('open', () => {
  // upon successful connection, start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
