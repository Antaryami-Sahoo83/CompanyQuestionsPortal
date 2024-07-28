/* eslint-disable react/prop-types */
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack, TextField, Alert, Snackbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import studentService from "../service/StudentService";
function createData(
  rollNo,
  name,
  email,
  mobile,
  address,
  program,
  branch,
  cgpa
) {
  return { rollNo, name, email, mobile, address, program, branch, cgpa };
}

function BasicTable({ rows = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Roll No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Mobile</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Program</TableCell>
            <TableCell align="right">Branch</TableCell>
            <TableCell align="right">CGPA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.rollNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rollNo}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.program}</TableCell>
              <TableCell align="right">{row.branch}</TableCell>
              <TableCell align="right">{row.cgpa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const SearchStudentDetails = () => {
  const [rollNo, setrollNo] = useState(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [studentData, setStudentData] = useState({
    rollNo: "",
    name: "",
    email: "",
    mobile: "",
    address: "",
    program: "",
    branch: "",
    cgpa: "",
  });
  const handlerollNo = (e) => {
    setrollNo(e.target.value);
  };
  const handleSearch = async () => {
    const roll = parseInt(rollNo);
    if (!isNaN(roll)) {
      const res = await studentService.getStudentDetailsByRoll({ value: roll });
      if (res.status) {
        const studentDetails = res.data.studentInfo[0];
        const studentAcademicDetails = res.data.studentAcademicInfo[0];
        setStudentData({
          rollNo: studentDetails.rollNo,
          name: studentDetails.name,
          email: studentDetails.email,
          mobile: studentDetails.mobile,
          address: `${studentDetails.address.city}, ${studentDetails.address.state}, PIN - ${studentDetails.address.pin}`,
          program: studentAcademicDetails.program,
          branch: studentAcademicDetails.branch,
          cgpa: studentAcademicDetails.cgpa,
        });
        setOpen(true);
        setSuccess(true);
      } else {
        setOpen(true);
        setSuccess(false);
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success
            ? "Successfully Fetched the Student Setails!!"
            : "Student details not Availaible!!"}
        </Alert>
      </Snackbar>
      <Stack
        marginBottom={"2rem"}
        spacing={"0.4rem"}
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        marginLeft={{
          xs: "0rem",
          sm: "0rem",
          md: "20rem",
        }}
        marginTop={"2rem"}
      >
        <TextField variant="outlined" label="Search" onChange={handlerollNo} />
        <Button variant="contained" color="success" onClick={handleSearch}>
          <SearchIcon />
          Search
        </Button>
      </Stack>
      {success ? (
        <BasicTable
          rows={[
            createData(
              studentData.rollNo,
              studentData.name,
              studentData.email,
              studentData.mobile,
              studentData.address,
              studentData.program,
              studentData.branch,
              studentData.cgpa
            ),
          ]}
        />
      ) : (
        <BasicTable />
      )}
    </>
  );
};

export default SearchStudentDetails;
