const mongoose = require("mongoose");

const studentInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    rollNo: {
      type: Number,
      unique: true,
      required: [true, "Roll number is required"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pin: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const StudentModel = mongoose.model("student", studentInfoSchema);
module.exports = StudentModel;
