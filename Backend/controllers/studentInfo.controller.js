const mongoose = require("mongoose");
const StudentModel = require("../models/studentInfo.model");

const addStudent = async (req, res) => {
  try {
    let std = await StudentModel.create(req.body);
    res.status(201).json(std);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStudentDetails = async (req, res) => {
  try {
    const stds = await StudentModel.find();
    res.status(200).json(stds);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStudent = async (req, res) => {
  try {
    const { roll } = req.params;
    const std = await StudentModel.find({ rollNo: roll });
    if (std.length > 0) {
      res.status(200).json(std);
    } else {
      res
        .status(404)
        .json({ message: "Record not found. Check Roll No and try again." });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Roll No." });
    } else {
      res.status(500).json(error);
    }
  }
};

const updateStudent = async (req, res) => {
  try {
    const { roll } = req.params;
    const std = await StudentModel.findOneAndUpdate(
      { rollNo: roll },
      req.body,
      { new: true }
    );
    if (std) {
      res.status(200).json(std);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Roll No" });
    } else {
      res.status(500).json(error);
    }
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { roll } = req.params;
    const std = await StudentModel.findOneAndDelete({ rollNo: roll });
    if (std) {
      res.status(200).json(std);
    } else {
      res.status(404).json({ message: "Roll No not found" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Roll No" });
    } else {
      res.status(500).json(error);
    }
  }
};

module.exports = {
  addStudent,
  getStudentDetails,
  getStudent,
  updateStudent,
  deleteStudent,
};
