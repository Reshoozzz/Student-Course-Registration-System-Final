const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    courseId: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
      match: [/^(Spring|Summer|Fall|Winter)\s\d{4}$/, "Semester must be like Spring 2026"],
    },
    status: {
      type: String,
      enum: ["pending", "registered", "dropped"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);