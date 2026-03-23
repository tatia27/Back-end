import bcrypt from "bcrypt";
import { Intern } from "../models/intern.model.js";
import { Company } from "../models/company.model.js";
import { generateToken } from "../jwtToken/jwtToken.js";

const isPasswordCorrect = async (user, password) => {
  const isCorrect = await bcrypt.compare(password, user.passwordHash);
  return isCorrect;
};

export const authResolvers = {
  Query: {
    isAuth: async (_, __, { sessionData }) => {
      const decoded = sessionData;

      if (!decoded) {
        return { message: "Not authorized" };
      }

      if (decoded.role === "intern") {
        const intern = await Intern.findOne({ _id: decoded.userId });

        if (intern) {
          return {
            role: intern.role,
            id: intern._id,
          };
        }

        return { message: "User not found" };
      }

      if (decoded.role === "company") {
        const company = await Company.findOne({ _id: decoded.userId });

        if (company) {
          return {
            role: company.role,
            id: company._id,
          };
        }

        return { message: "Company not found" };
      }

      return { message: "Not authorized" };
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      if (!email || !password) {
        return { message: "Please fill full form!" };
      }

      const intern = await Intern.findOne({ email });
      const company = await Company.findOne({ email });

      if (company) {
        const isCompanyPasswordCorrect = await isPasswordCorrect(
          company,
          password,
        );

        if (!isCompanyPasswordCorrect) {
          return { message: "Wrong email or password" };
        }

        if (!company.accessToken) {
          let token = generateToken(company._id, company.role);

          await Company.findByIdAndUpdate(company._id, {
            $set: { accessToken: token },
          });

          return {
            success: true,
            token,
          };
        }

        return {
          success: true,
          token: company.accessToken,
        };
      } else if (intern) {
        const isInternPasswordCorrect = await isPasswordCorrect(
          intern,
          password,
        );

        if (!isInternPasswordCorrect) {
          return { message: "Wrong email or password" };
        }

        if (!intern.accessToken) {
          let token = generateToken(intern._id, intern.role);

          await Intern.findByIdAndUpdate(intern._id, {
            $set: { accessToken: token },
          });

          return {
            success: true,
            token,
          };
        }

        return {
          success: true,
          token: intern.accessToken,
        };
      } else {
        return { error: "User not found" };
      }
    },

    // logout: async (_, __, { sessionData }) => {
    //   if (!sessionData) {
    //     return { message: "Not authorized" };
    //   }

    //   if (sessionData.role === "intern") {
    //     await Intern.findByIdAndUpdate(sessionData.userId, {
    //       $set: { accessToken: null },
    //     });
    //   } else {
    //     await Company.findByIdAndUpdate(sessionData.userId, {
    //       $set: { accessToken: null },
    //     });
    //   }

    //   return {
    //     message: "Logged Out Successfully.",
    //   };
    // },
  },
};
