export const companyType = `
  type Company {
    id: ID!
    name: String!
    email: String!
    role: String!
    photo: String
    description: String
  }

  extend type Query {
    companies: [Company!]!
    getCompany(id: ID!): Company
  }

  extend type Mutation {
    createCompany(
      name: String!
      email: String!
      password: String!
      photo: String
      description: String
    ): Company

    updateCompany(
      id: ID!
      name: String
      description: String
      photo: String
    ): Company

    deleteCompany(id: ID!): Company
  }
`;
