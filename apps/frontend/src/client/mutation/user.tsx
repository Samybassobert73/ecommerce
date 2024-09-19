import { gql } from '@apollo/client';

export const ADDUSER = gql`
  mutation RegUser($email: String!, $password: String!) {
    regUser(email: $email, password: $password) {
      success
      message
      user {
        email
      }
    }
  }
`;

export const LOGUSER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;
