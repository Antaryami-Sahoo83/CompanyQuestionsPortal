const mongoose = require("mongoose");

const studentAcaSchema = new mongoose.Schema(
  {
    rollNo: {
      type: Number,
      unique: true,
      required: [true, "Roll number is required"],
    },
    program: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    cgpa: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentAcademicModel = mongoose.model(
  "studentAcademic",
  studentAcaSchema
);
module.exports = StudentAcademicModel;
