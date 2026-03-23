export const authType = `
type Auth {
    id: ID
    role: String
    token: String
    message: String
    success: Boolean
    error: String
  }

  extend type Query {
    isAuth: Auth
  }

  extend type Mutation {
    login(email: String!, password: String!): Auth
  }
`;
