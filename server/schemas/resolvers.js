/* CREATE RESOLVERS TO PERFORM CRUD ACTIONS ON QUERIES AND MUTATIONS */
// Resolver to server the response for the `helloWorld` query and
const resolvers = {
  Query: {
    helloWorld: () => {
      return 'Hello World!';
    },
  },
};

// Export resolvers
module.exports = resolvers;
