export const internType = `

type CV {
  age: Int
  location: String
  levelOfEducation: String
  educationalInstitution: String
  specialization: String
  hardSkills: String
  softSkills: String
}

  type Intern {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
    email: String!
    role: String!
    description: String
    favorites: [ID]
    cv: CV
  }

  extend type Query {
    interns: [Intern!]!
    getIntern(id: ID!): Intern
  }

  extend type Mutation {
    createIntern(
      firstName: String!
      middleName: String!
      lastName: String!
      email: String!
      password: String!
      description: String
    ): Intern

     deleteIntern(id: ID!): Intern
  }
`;
