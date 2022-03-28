/* AUTHENTICATE JSON WEB TOKEN (JWT) */
// Import dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Import and configure the dotenv dependency so we can use process.env for sensitive information

const secret = SECRET_ID; // secret to enable the server to verify whether it recognizes the token
const expiration = '2h'; // expiration date

module.exports = {
  // expects a user object and will add that user's username, email and _id to the token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
