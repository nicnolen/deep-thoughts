// Import dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const { authMiddleware } = require('./utils/auth');

// Import personal files
const { typeDefs, resolvers } = require('./schemas'); // Import typeDefs and resolvers
const db = require('./config/connection'); // Import Mongoose database connection

const PORT = process.env.PORT || 3001;
const app = express();

// Start a new Apollo server
const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test oour GQL API
  console.info(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Listen for connection to be made the first time the database is opened using db.once('open')
db.once('open', () => {
  // upon successful connection, start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
