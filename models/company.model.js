import mongoose from "mongoose";

export const companySchema = new mongoose.Schema({
  name: {
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
    enum: ["Intern", "Company", "Admin"],
  },
  photo: String,
  description: String,
});

export const Company = mongoose.model("companies", companySchema);
