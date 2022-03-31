"TODO: MUTATIONS FOR REACT"
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
   #! Mutation to check if user is logged in
   mutation login($email: String!, $password: String!) {
     login(email: $email, password: $password) {
       token # user JWT
       user {
         _id
         username
       } # user data
     }
   }
`;

export const ADD_USER = gql`
  #! Mutation to create a new user
  mutation addUser($username: String!, $email: String!, $password: String!) { 
    addUser(username: $username, email: $email, password: $password) {
      token # user JWT
      user {
        _id
        username
      } # user data
    }
  }
`;

export const ADD_FRIEND = gql`
  #! Mutation to add friends
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;