/* CREATE TYPE DEFINITIONS TO DEFINE THE DATA THE CLIENT CAN EXPECT TO WORK WITH */
// Import the gql tagged template function
const { gql } = require('apollo-server-express');

// Create our type definitions (typeDefs)
const typeDefs = gql`
  """ create a thoughts query that returns _id, thoughtText, username, and reactionCount fields and their GraphQL scalars(datatypes) """
  type Thought {
    _id: ID # ... same as String but looking for a unique identifier
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int # ... integer
  }

  """ query through data and return an array of the Thought data type """
  type Query {
    thoughts: [Thought]
  }
`; // This is a tagged template function, used to provide explicit details on how a library is used

// Export the typeDefs
module.exports = typeDefs;
