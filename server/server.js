//TODO: BACK END SERVER FILE
//! Import dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const path = require('path');

//! Import personal files
const { typeDefs, resolvers } = require('./schemas'); // Import typeDefs and resolvers
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection'); // Import Mongoose database connection

const PORT = process.env.PORT || 3001;
const app = express();

//! Start a new Apollo server
const startServer = async () => {
  //* create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  //* start the Apollo server
  await server.start();

  //* integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  //* log where we can go to test our GQL API
  console.info(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//! Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//! Catch-all route where any route that isnt defined is treated as a 404 error
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//! Listen for connection to be made the first time the database is opened using db.once('open')
db.once('open', () => {
  //* upon successful connection, start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
