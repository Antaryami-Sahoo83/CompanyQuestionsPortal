const express = require("express");

const {
  addStudent,
  getStudentDetails,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentInfo.controller");

const {
  addStdAcademic,
  getStdAcademicDetails,
  getStdAcademic,
  updateStdAcademic,
  deleteStdAcademic,
} = require("../controllers/studentAcademic.controller");

const {
  getAllStudentDetails,
  addAllStudentDetails,
  getStudentDetailsByRoll,
  deleteStudentDetailsByRoll,
  updateStudentDetailsByRoll,
} = require("../controllers/stdAll.controller");

const stdRouter = express.Router();

stdRouter.post("/studentInfo", addStudent);
stdRouter.get("/studentInfo/:roll", getStudent);
stdRouter.get("/studentInfo", getStudentDetails);
stdRouter.put("/studentInfo/:roll", updateStudent);
stdRouter.delete("/studentInfo/:roll", deleteStudent);

stdRouter.post("/studentAcademic", addStdAcademic);
stdRouter.get("/studentAcademic/:roll", getStdAcademic);
stdRouter.get("/studentAcademic", getStdAcademicDetails);
stdRouter.put("/studentAcademic/:roll", updateStdAcademic);
stdRouter.delete("/studentAcademic/:roll", deleteStdAcademic);

stdRouter.get("/allStudentInfo/", getAllStudentDetails);
stdRouter.post("/studentAddInfoAcademics/", addAllStudentDetails);
stdRouter.get("/allStudentInfo/:roll", getStudentDetailsByRoll);
stdRouter.delete("/allStudentInfo/:roll", deleteStudentDetailsByRoll);
stdRouter.put("/allStudentInfo/:roll", updateStudentDetailsByRoll);

module.exports = stdRouter;
