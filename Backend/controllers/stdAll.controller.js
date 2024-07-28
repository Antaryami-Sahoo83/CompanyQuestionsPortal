const mongoose = require("mongoose");
const StudentModel = require("../models/studentInfo.model");
const StudentAcademicModel = require("../models/studentAcademic.model");

const getAllStudentDetails = async (req, res) => {
  try {
    //     const { roll } = req.params;
    const details = await StudentModel.aggregate([
      {
        $lookup: {
          from: "studentacademics",
          localField: "rollNo",
          foreignField: "rollNo",
          as: "studentAcademics",
        },
      },
      // {
      //   $match: {
      //     rollNo: Number(roll),     // For specific rollNo values
      //   },
      // },
    ]);
    if (details) {
      res.status(200).json(details);
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

const addAllStudentDetails = async (req, res) => {
  try {
    const { name, rollNo, mobile, email, address, studentDetails } = req.body;
    const { program, branch, cgpa } = studentDetails;
    const student = await StudentModel.create({
      name,
      rollNo,
      mobile,
      email,
      address,
    });
    const studentAcademic = await StudentAcademicModel.create({
      rollNo,
      program,
      branch,
      cgpa,
    });
    res
      .status(200)
      .json({ message: "Data Inserted to both the collections!!" });
  } catch (error) {
    res.status(500).json({ Error: "Error is : " + error });
  }
};

const getStudentDetailsByRoll = async (req, res) => {
  try {
    const roll = req.params.roll;
    const student = await StudentModel.find({ rollNo: roll });
    // console.log(student);
    const student_academic_info = await StudentAcademicModel.find({
      rollNo: roll,
    });
    const studentDetails = {
      studentInfo: [...student],
      studentAcademicInfo: [...student_academic_info],
    };
    res.status(201).json(studentDetails);
  } catch (error) {
    res.status(400).json({ message: "Student not found!!" });
  }
};

const updateStudentDetailsByRoll = async (req, res) => {
  try {
    const roll = req.params.roll;
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { rollNo: roll },
      req.body.studentDetails[0],
      { new: true }
    );
    const updatedStudentAcademicDetails =
      await StudentAcademicModel.findOneAndUpdate(
        { rollNo: roll },
        req.body.studentAcademicDetails[0],
        { new: true }
      );
    if (updatedStudent && updatedStudentAcademicDetails) {
      res.status(200).json([updatedStudent, updatedStudentAcademicDetails]);
    } else {
      res
        .status(404)
        .json({ message: "No Student with this rollNo is present" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteStudentDetailsByRoll = async (req, res) => {
  try {
    const roll = req.params.roll;
    const deletedStudent = await StudentModel.findOneAndDelete({
      rollNo: roll,
    });
    const deletedStudentAcademicInfo =
      await StudentAcademicModel.findOneAndDelete({ rollNo: roll });
    if (!deletedStudent && !deletedStudentAcademicInfo) {
      return res.status(404).json("No such user present");
    } else if (deletedStudent && deletedStudentAcademicInfo) {
      res.status(200).json(deletedStudent);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllStudentDetails,
  addAllStudentDetails,
  getStudentDetailsByRoll,
  updateStudentDetailsByRoll,
  deleteStudentDetailsByRoll,
};

// Sample data for Insert to both the collections

// {
//       "name": "Alice Smith",
//       "rollNo": 102,
//       "mobile": "9876543210",
//       "email": "alice.smith@example.com",
//       "address": {
//           "city": "Los Angeles",
//           "state": "CA",
//           "pin": "90001"
//       },
//       "studentDetails": {
//           "program": "Electrical Engineering",
//           "branch": "Power Systems",
//           "cgpa": 7.90
//       }
//   }
