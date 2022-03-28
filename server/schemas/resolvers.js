/* CREATE RESOLVERS TO PERFORM CRUD ACTIONS ON QUERIES AND MUTATIONS */
// Import User and Thought models
const { User, Thought } = require('../models')
// Create resolvers
const resolvers = {
  // Thoughts query resolver
  Query: {
    thoughts: async() => {
      return Thought.find().sort({ createdAt: -1 });
    },
  },
};

// Export resolvers
module.exports = resolvers;
