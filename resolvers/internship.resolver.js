import mongoose from "mongoose";
import Internship from "../models/internship.model.js";
import { Intern } from "../models/intern.model.js";
import { extractSkills } from "../utils/extractSkills.js";

export const internshipResolvers = {
  Query: {
    internships: async () => {
      return await Internship.find();
    },
    getInternship: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Internship ID");
      }
      const internship = await Internship.findById(id);
      if (!internship) throw new Error("Internship not found");
      return internship;
    },

    getInternshipsForIntern: async (_, { internId }) => {
      try {
        return await Internship.find({
          participants: internId,
          isActive: true,
        });
      } catch (err) {
        throw new Error(err.message);
      }
    },

    getPopularInternships: async () => {
      try {
        const limit = 6;

        const internships = await Internship.find({
          salary: { $ne: null },
          typeOfEmployment: "Partial",
          isActive: true,
        }).limit(limit);

        return internships;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    getFavoritesInternships: async (_, { internId }) => {
      try {
        const user = await Intern.findById(internId);

        if (!user) {
          throw new Error("Intern not found");
        }

        const favorites = await Internship.find({
          _id: { $in: user.favorites },
        });

        return favorites;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    getFilteredInternships: async (
      _,
      {
        page = 1,
        limit = 4,
        focusOfInternship,
        schedule,
        typeOfEmployment,
        salary,
      },
    ) => {
      try {
        let filter = { isActive: true };

        const skip = (page - 1) * limit;

        if (focusOfInternship) {
          const arr = focusOfInternship.split(",");
          filter.focusOfInternship = { $in: arr };
        }

        if (schedule) {
          const arr = schedule.split(",");
          filter.schedule = { $in: arr };
        }

        if (typeOfEmployment) {
          const arr = typeOfEmployment.split(",");
          filter.typeOfEmployment = { $in: arr };
        }

        if (salary) {
          const arr = salary.split(",");

          if (arr.includes("paid")) {
            filter.salary = { $ne: null };
          } else if (arr.includes("unpaid")) {
            filter.salary = { $eq: null };
          } else {
            filter.salary = { $in: arr };
          }
        }

        const internships = await Internship.find(filter)
          .skip(skip)
          .limit(limit);

        const totalInternships = await Internship.countDocuments(filter);

        return {
          internships,
          numberOfPages: Math.ceil(totalInternships / limit),
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    getInternshipsForCompany: async (_, { id }) => {
      const internshipObjectId = new mongoose.Types.ObjectId(id);

      const internshipsForCompany = await Internship.find({
        companyId: internshipObjectId,
        isActive: true,
      });

      return internshipsForCompany;

      // res.status(HTTP_CODES.SUCCESS).json(internshipsForComapny);
    },

    participantsOfInternship: async (_, { id }) => {
      const internshipObjectId = new mongoose.Types.ObjectId(id);
      const internship = await Internship.findOne({ _id: internshipObjectId });

      if (!internship) {
        throw new Error("Internship not found");
      }

      return internship.participants;
    },
  },
  Mutation: {
    createInternship: async (_, args) => {
      const { title, skills } = args;

      const tags = extractSkills(title + " " + skills);

      const internship = new Internship({
        ...args,
        tags,
        isActive: true,
      });
      return await internship.save();
    },
    updateInternship: async (_, { id, ...updateFields }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Internship ID");
      }
      const updatedInternship = await Internship.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true },
      );
      if (!updatedInternship) throw new Error("Internship not found");
      return updatedInternship;
    },
    deleteInternship: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Internship ID");
      }
      const deleted = await Internship.findByIdAndDelete(id);
      if (!deleted) throw new Error("Internship not found");
      return deleted;
    },

    applyForInternship: async (_, { internshipId, userId }) => {
      try {
        // 🔍 Проверяем существование стажировки
        const internship = await Internship.findById(internshipId);

        if (!internship) {
          throw new Error("Internship not found");
        }

        // 🔍 Проверяем, уже ли подан
        const alreadyApplied = internship.participants.includes(userId);

        if (alreadyApplied) {
          throw new Error("User already applied for this internship");
        }

        // ✅ Обновляем
        const updatedInternship = await Internship.findByIdAndUpdate(
          internshipId,
          { $push: { participants: userId } },
          { returnDocument: "after" },
        );

        return updatedInternship;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Internship: {
    id: (parent) => parent._id.toString(),
  },
};
