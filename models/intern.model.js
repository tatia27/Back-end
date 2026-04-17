import mongoose from "mongoose";

export const internSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middledName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      default: "intern",
      enum: ["intern", "company", "admin"],
    },
    description: String,
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    cv: {
      age: {
        type: Number,
        default: null,
      },
      location: {
        type: String,
      },
      levelOfEducation: {
        type: String,
      },
      educationalInstitution: {
        type: String,
      },
      specialization: {
        type: String,
      },
      hardSkills: {
        type: String,
      },
      softSkills: {
        type: String,
      },
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  },
);

export const Intern = mongoose.model("interns", internSchema);
