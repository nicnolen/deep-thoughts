/* CREATE TYPE DEFINITIONS TO DEFINE THE DATA THE CLIENT CAN EXPECT TO WORK WITH */
// Import the gql tagged template function
const { gql } = require('apollo-server-express');

// Create our type definitions (typeDefs)
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`; // This is a tagged template function, used to provide explicit details on how a library is used

// Export the typeDefs
module.exports = typeDefs;
