import mongoose from "mongoose";

export const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    focusOfInternship: {
      type: String,
      required: true,
      enum: [
        "Frontend developer",
        "Backend developer",
        "Mobile developer",
        "System administrator",
        "Game developer",
        "Tester",
        "Analyst",
        "Designer",
        "Manager",
        "Recruiter",
        "Other",
      ],
    },
    schedule: {
      type: String,
      required: true,
      enum: ["Office", "Remotely"],
    },
    typeOfEmployment: {
      type: String,
      required: true,
      enum: ["Full", "Partial"],
    },
    durationOfInternship: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: null,
    },
    skills: {
      type: String,
      required: true,
    },
    conditions: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    isActive: {
      type: Boolean,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model("internship", internshipSchema);
