import { makeExecutableSchema } from "@graphql-tools/schema";
import { internType } from "./intern.schema.js";
import { companyType } from "./company.schema.js";
import { internshipType } from "./internship.schema.js";
import { internResolvers } from "../resolvers/intern.resolver.js";
import { companyResolvers } from "../resolvers/company.resolver.js";
import { internshipResolvers } from "../resolvers/internship.resolver.js";
import { authResolvers } from "../resolvers/auth.resolver.js";
import { authType } from "./auth.schema.js";

const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  baseTypeDefs,
  internType,
  companyType,
  internshipType,
  authType,
];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [
    internResolvers,
    companyResolvers,
    internshipResolvers,
    authResolvers,
  ],
});
