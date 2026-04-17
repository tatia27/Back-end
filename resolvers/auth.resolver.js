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

      if (decoded.role === "intern" || decoded.role === "admin") {
        const intern = await Intern.findOne({ _id: decoded.userId });
        if (intern) {
          return {
            role: intern.role,
            id: intern._id,
          };
        }
      }

      if (decoded.role === "company" || decoded.role === "admin") {
        const company = await Company.findOne({ _id: decoded.userId });
        if (company) {
          return {
            role: company.role,
            id: company._id,
          };
        }
      }

      return { message: "User not found" };
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

    promoteToAdmin: async (_, { userId, userType }, { sessionData }) => {
      if (!sessionData) {
        return {
          success: false,
          message: "Not authorized. Please login first.",
        };
      }

      let targetUser;
      if (userType === "intern") {
        targetUser = await Intern.findById(userId);
      } else if (userType === "company") {
        targetUser = await Company.findById(userId);
      } else {
        return {
          success: false,
          message: "Invalid user type. Must be 'intern' or 'company'",
        };
      }

      if (!targetUser) {
        return {
          success: false,
          message: "User not found",
        };
      }

      if (sessionData.role !== "admin") {
        return {
          success: false,
          message: "Forbidden. Only ADMIN can promote users to admin role",
        };
      }

      const adminCount =
        (await Intern.countDocuments({ role: "admin" })) +
        (await Company.countDocuments({ role: "admin" }));

      if (targetUser.role === "admin" && adminCount === 1) {
        return {
          success: false,
          message: "Cannot demote the last admin",
        };
      }

      const oldRole = targetUser.role;

      targetUser.role = "admin";

      const newToken = generateToken(targetUser._id, "admin");
      targetUser.accessToken = newToken;

      await targetUser.save();

      return {
        success: true,
        message: `User ${targetUser.email} has been promoted to ADMIN`,
        user: {
          id: targetUser._id,
          email: targetUser.email,
          role: targetUser.role,
        },
        newToken: newToken,
      };
    },

    logout: async (_, __, { sessionData }) => {
      const decoded = sessionData;
      if (!decoded) {
        return {
          success: false,
          message: "Not authorized",
        };
      }

      if (decoded.role === "intern") {
        await Intern.findByIdAndUpdate(decoded.userId, {
          $set: { accessToken: null },
        });
      } else if (decoded.role === "company") {
        await Company.findByIdAndUpdate(decoded.userId, {
          $set: { accessToken: null },
        });
      } else if (decoded.role === "admin") {
        const companyAdmin = await Company.findById(decoded.userId);
        if (companyAdmin) {
          await Company.findByIdAndUpdate(decoded.userId, {
            $set: { accessToken: null },
          });
        } else {
          await Intern.findByIdAndUpdate(decoded.userId, {
            $set: { accessToken: null },
          });
        }
      }

      return {
        success: true,
        message: "Logged Out Successfully.",
      };
    },
  },
};
