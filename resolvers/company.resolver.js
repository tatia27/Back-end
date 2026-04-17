import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Company } from "../models/company.model.js";

export const companyResolvers = {
  Query: {
    companies: async () => {
      return await Company.find();
    },

    getCompany: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid company ID");
      }
      const company = await Company.findById(id);
      if (!company) {
        throw new Error("Company not found");
      }
      return company;
    },
  },
  Mutation: {
    createCompany: async (_, { name, email, password, photo, description }) => {
      if (!name || !email || !password || password.length < 8) {
        throw new Error("Invalid input: name, email, or password");
      }
      const existingCompany = await Company.findOne({ email });
      if (existingCompany) {
        throw new Error("Email already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const company = await Company.create({
        name,
        email,
        passwordHash,
        photo,
        description,
        role: "company",
      });
      return company;
    },

    updateCompany: async (_, { id, name, description, photo }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid company ID");
      }
      const updateFields = {};
      if (name !== undefined) updateFields.name = name;
      if (description !== undefined) updateFields.description = description;
      if (photo !== undefined) updateFields.photo = photo;
      const updatedCompany = await Company.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true },
      );
      if (!updatedCompany) {
        throw new Error("Company not found");
      }
      return updatedCompany;
    },

    deleteCompany: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid company ID");
      }
      const deleted = await Company.findByIdAndDelete(id);
      if (!deleted) throw new Error("Company not found");
      return deleted;
    },
  },

  Company: {
    id: (parent) => parent._id.toString(),
  },
};
