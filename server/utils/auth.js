/* AUTHENTICATE JSON WEB TOKEN (JWT) */
// Import dependencies
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh'; // secret to enable the server to verify whether it recognizes the token
const expiration = '2h'; // expiration date

module.exports = {
  // expects a user object and will add that user's username, email and _id to the token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
