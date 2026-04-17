import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Intern } from "../models/intern.model.js";
import Internship from "../models/internship.model.js";

export const internResolvers = {
  Query: {
    interns: async () => {
      return await Intern.find();
    },
    getIntern: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Intern ID");
      }
      const intern = await Intern.findById(id);
      if (!intern) throw new Error("Intern not found");
      return intern;
    },
  },

  Mutation: {
    createIntern: async (_, args) => {
      const {
        firstName, //
        middledName,
        lastName,
        email,
        password,
        description,
      } = args;

      const existingIntern = await Intern.findOne({ email });
      if (existingIntern) {
        throw new Error("Email already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const intern = new Intern({
        firstName,
        middledName,
        lastName,
        email,
        passwordHash,
        description,
        role: "intern",
      });

      return await intern.save();
    },

    deleteIntern: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid company ID");
      }
      const deleted = await Intern.findByIdAndDelete(id);
      if (!deleted) throw new Error("Company not found");
      return deleted;
    },
  },
  Intern: {
    id: (parent) => parent._id.toString(),
  },
};
