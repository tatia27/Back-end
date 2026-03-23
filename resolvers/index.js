import { internResolvers } from "./intern.resolver.js";
import { companyResolvers } from "./company.resolver.js";
import { internshipResolvers } from "./internship.resolver.js";
import { authResolvers } from "./auth.resolver.js";

export const resolvers = [
  authResolvers,
  internResolvers,
  companyResolvers,
  internshipResolvers,
];
