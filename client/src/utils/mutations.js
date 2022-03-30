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