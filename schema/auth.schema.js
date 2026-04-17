export const authType = `
type Auth {
    id: ID
    role: String
    token: String
    message: String
    success: Boolean
    error: String
  }

  type UserInfo {
  id: ID!
  email: String!
  role: String!
}

  type PromoteToAdminResponse {
  success: Boolean!
  message: String!
  user: UserInfo
  newToken: String
}


type LogoutResponse {
  success: Boolean!
  message: String!
}


  extend type Query {
    isAuth: Auth
  }

  extend type Mutation {
    login(email: String!, password: String!): Auth
    logout: LogoutResponse!
    promoteToAdmin(userId: ID!, userType: String!): PromoteToAdminResponse!
  }
`;
