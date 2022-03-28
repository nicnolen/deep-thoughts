/* CREATE RESOLVERS TO PERFORM CRUD ACTIONS ON QUERIES AND MUTATIONS */
// Import User and Thought models
const { User, Thought } = require('../models');

// Create resolvers
const resolvers = {
  // Thoughts query resolver
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
};

// Export resolvers
module.exports = resolvers;
