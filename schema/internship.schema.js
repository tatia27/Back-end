export const internshipType = `
  type Internship {
    id: ID!
    title: String!
    company: String!
    focusOfInternship: String!
    schedule: String!
    typeOfEmployment: String!
    durationOfInternship: String!
    salary: Float
    skills: String!
    conditions: String!
    participants: [ID]
    isActive: Boolean
    companyId: ID
    tags: [String]
  }
    

  type InternshipResponse {
  internships: [Internship!]!
  numberOfPages: Int!
  }

  extend type Query {
    internships: [Internship!]!
    getPopularInternships: [Internship!]
    getInternship(id: ID!): Internship
    getInternshipsForIntern(internId: ID!): [Internship]
    getFavoritesInternships(internId: ID!): [Internship]
    getInternshipsForCompany(id: ID!): [Internship]
    participantsOfInternship(id: ID!): [ID]
    getFilteredInternships(
    page: Int
    limit: Int
    focusOfInternship: String
    schedule: String
    typeOfEmployment: String
    salary: String
  ): InternshipResponse!
  }

  extend type Mutation {
    createInternship(
      title: String!
      company: String!
      focusOfInternship: String!
      schedule: String!
      typeOfEmployment: String!
      durationOfInternship: String!
      salary: Float
      skills: String!
      conditions: String!
      companyId: ID
    ): Internship
    
    applyForInternship(internshipId: ID!, userId: ID!): Internship

 
    
    updateInternship(
      id: ID!
      title: String
      salary: Float
      isActive: Boolean
    ): Internship

    deleteInternship(id: ID!): Internship
  }
`;
