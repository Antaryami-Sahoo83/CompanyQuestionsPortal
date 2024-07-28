const mongoose = require("mongoose");
const StudentAcademicModel = require("../models/studentAcademic.model");

const addStdAcademic = async (req, res) => {
  try {
    let std = await StudentAcademicModel.create(req.body);
    res.status(201).json(std);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStdAcademicDetails = async (req, res) => {
  try {
    const stds = await StudentAcademicModel.find();
    res.status(200).json(stds);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStdAcademic = async (req, res) => {
  try {
    const { roll } = req.params;
    const std = await StudentAcademicModel.find({ rollNo: roll });
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

const updateStdAcademic = async (req, res) => {
  try {
    const { roll } = req.params;
    const std = await StudentAcademicModel.findOneAndUpdate(
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

const deleteStdAcademic = async (req, res) => {
  try {
    const { roll } = req.params;
    const std = await StudentAcademicModel.findOneAndDelete({ rollNo: roll });
    if (std) {
      res.status(200).json(interview);
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
  addStdAcademic,
  getStdAcademicDetails,
  getStdAcademic,
  updateStdAcademic,
  deleteStdAcademic,
};
