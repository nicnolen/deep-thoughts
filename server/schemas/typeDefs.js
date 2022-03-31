"TODO: CREATE TYPE DEFINITIONS TO DEFINE THE DATA THE CLIENT CAN EXPECT TO WORK WITH"
"Import the gql tagged template function used to provide explicit details on how a library is used"
const { gql } = require('apollo-server-express');

"Create our type definitions (typeDefs)"
const typeDefs = gql` 
  "create a User query that returns _id, username, email, friendCount, thoughts, and friends"
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  "create a Thought query that returns _id, thoughtText, username, and reactionCount fields and their GraphQL scalars(datatypes)"
  type Thought {
    _id: ID # same as String but looking for a unique identifier
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int # integer
    reactions: [Reaction]
  }

  "create a Reaction query that returns _id, reactionBody, createdAt, and username"
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  "include JWT"
  type Auth {
    token: ID!
    user: User
  }

  "query through data and return the required user and thoughts data"
  type Query {
    me: User
    users: [User]
    user(username: String!): User # the ! means that the data must exist for the query to carry out
    thoughts(username: String): [Thought] #! could recieve a parameter (username with a String datatype) if we wanted to but dont have too
    thought(_id: ID!): Thought
  }

  "create mutations to return users who successfully logged in or just signed up"
  type Mutation {
    login(email: String!, password: String!): Auth #* user cant login without email and password
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }
`; 

"Export the typeDefs"
module.exports = typeDefs;
