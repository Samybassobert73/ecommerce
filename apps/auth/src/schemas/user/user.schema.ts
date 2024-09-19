export const usersGQLSchema = `#graphql
  type User {
    id: String!
    name: String!
    email: String!
    phone: String!
    password: String!
  }

  type UserLogin {
    token: String!
  }

  type UserRegister{
    success: Boolean!
    message: String!
    user: User!
  }

  type Query {
    users: usersInfoResponse!
    user: User!
  }

  type usersInfoResponse {
    success: Boolean!
    total: Int!
    users: [User!]!
  }

  type Mutation {
    regUser( email: String!, password: String!): UserRegister!
    loginUser(email: String!, password: String!): UserLogin!
    updateUser(
      id: String!
      name: String
      email: String
      password: String
    ): User!
    deleteUser(id: String!): deleteResponse!
  }

  type deleteResponse {
    success: Boolean!
    message: String!
    id: String!
  }
`;
