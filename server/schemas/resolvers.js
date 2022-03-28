/* CREATE RESOLVERS TO PERFORM CRUD ACTIONS ON QUERIES AND MUTATIONS */
// Import dependencies
const { User, Thought } = require('../models'); // Import User and Thought models
const { AuthenticationError } = require('apollo-server-express'); // Authentication
const { signToken } = require('../utils/auth'); // Import signToken() function from utils/auth.js

// Create resolvers
const resolvers = {
  // QUERIES
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // get all thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {}; // ternary operator to check if username exists
      return Thought.find(params).sort({ createdAt: -1 });
    }, // parent used as a placeholder so we can access the username argument from the second parameter
    // get thought by identifier
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },

  // MUTATIONS
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

// Export resolvers
module.exports = resolvers;
