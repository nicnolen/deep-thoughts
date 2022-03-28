/* CREATE RESOLVERS TO PERFORM CRUD ACTIONS ON QUERIES AND MUTATIONS */
// Import User and Thought models
const { User, Thought } = require('../models');

// Create resolvers
const resolvers = {
  // Thoughts query resolver
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {}; // ternary operator to check if username exists
      return Thought.find(params).sort({ createdAt: -1 });
    }, // parent used as a placeholder so we can access the username argument from the second parameter
  },
};

// Export resolvers
module.exports = resolvers;
